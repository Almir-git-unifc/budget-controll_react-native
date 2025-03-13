import { View, Text, Linking, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import Colors from '../../utils/Colors';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { supabase } from '../../utils/SupabaseConfig'; // Importe seu cliente Supabase
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importe o ícone
import { StatusBar } from 'expo-status-bar';

export default function History() {
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [dateRange, setDateRange] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);
  const [noItemsMessage, setNoItemsMessage] = useState('');

  useEffect(() => {
    getDateList();
    fetchCategoryItems();
  }, [selectedDate]);

  const getDateList = () => {
    const dates = GetPrevDateRangeToDisplay();
    setDateRange(dates);
  };


  const GetPrevDateRangeToDisplay = () => {
    const today = moment();
    const range = [];
    for (let i = 6; i >= 0; i--) {
      const date = today.clone().subtract(i, 'days');
      range.push({
        formattedDate: date.format('YYYY-MM-DD'),
        day: date.format('dd'),
        date: date.format('D'),
      });
    }
    return range;
  };

  const fetchCategoryItems = async () => {
    try {
      let { data: CategoryItems, error } = await supabase
        .from('CategoryItems')
        .select('image, name, created_at')
        .gte('created_at', `${selectedDate}T00:00:00+00:00`)
        .lte('created_at', `${selectedDate}T23:59:59+00:00`);

      if (error) {
        console.error('Erro ao buscar dados:', error);
        return;
      }

      if (CategoryItems && CategoryItems.length > 0) {
        const itemsWithHour = CategoryItems.map((item) => ({
          ...item,
          hour: moment(item.created_at).format('HH'),
        }));
        setCategoryItems(itemsWithHour);
        setNoItemsMessage('');
      } else {
        setCategoryItems([]);
        setNoItemsMessage('Não há nenhum item criado nesta data para ser exibido');
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const renderItemFlat2 = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <Text style={styles.itemName}>{item.name}</Text>
      <View style={styles.hourContainer}>
        <Icon name="access-time" size={20} color={Colors.BLACK} />
        <Text style={styles.itemHour}>{item.hour}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={Colors.WHITE} barStyle="dark-content" />
      <Image source={require('../../assets/budgethistor.png')} style={styles.imageBanner} />
                    <Text style={styles.txtIntroLink}>
                      Designed by vectorjuice in{' '}
                      <Text
                         style={styles.txtHiperlink}
                         onPress={ () => {Linking.openURL('https://www.freepik.com/free-vector/financial-analyst-planning-checklist-clipboard-calculator-calendar-budget-planning-balanced-budget-company-budget-management-concept_10782648.htm#from_element=detail_alsolike')}  }
                      >
                         Freepik
                      </Text>
                    </Text>

      <Text style={styles.textTitle}>History of the last 7 days</Text>

      <FlatList
        data={dateRange}
        horizontal
        style={{ marginTop: 15 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              styles.dateGroup,
              { backgroundColor: item.formattedDate === selectedDate ? Colors.BLUE_SOFT : Colors.LIGHT_GRAY },
            ]}
            onPress={() => setSelectedDate(item.formattedDate)}
          >
            <Text
              style={[
                styles.day,
                { color: item.formattedDate === selectedDate ? Colors.WHITE : Colors.BLACK },
              ]}>
              {item.day}
            </Text>
            <Text
              style={[
                styles.date,
                { color: item.formattedDate === selectedDate ? Colors.WHITE : Colors.BLACK },
              ]}>
              {item.date}
            </Text>
          </TouchableOpacity>
        )}
      />

      {noItemsMessage ? (
        <Text style={[styles.noItemsText]}>{noItemsMessage}</Text>
      ) : (
        <FlatList
          data={categoryItems}
          renderItem={renderItemFlat2}
          keyExtractor={(item) => item.created_at}
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 20, backgroundColor: Colors.GRAY_TRANSP}}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 25,
    backgroundColor: Colors.PRIMARY,
    height: '100%',
    marginTop: 30,
  },
  textTitle: {
    fontSize: 22,
    fontWeight: 'bold',      
    marginTop: 20,
  },
    txtHiperlink: {
      color: Colors.BLUE_LINK,
    },
    txtIntroLink: {
      color: Colors.GRAY_LINK,
      textAlign: 'center',
      marginTop: 5,
    },
  dateGroup: {
    padding: 15,
    backgroundColor: Colors.LIGHT_GRAY,  
    display: 'flex',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 10,
    height: 80,
  },
  day: {
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 3,
    borderBottomColor: Colors.GRAY_SEPAR,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  itemName: {
    flex: 1,
    fontSize: 16,
    fontWeight:  'bold',
  },
  hourContainer: {
    alignItems: 'center',
  },
  itemHour: {
    fontSize: 14,
    fontWeight:  'bold',
  },
  imageBanner: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginTop: 20,
  },
  noItemsText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
    position: 'absolute',
    top: '65%',
    left: '10%',
    fontWeight: 'bold',
  },
});
