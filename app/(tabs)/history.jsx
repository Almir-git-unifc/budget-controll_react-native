import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import Colors from '../../utils/Colors';
import { useEffect, useState } from 'react';
import moment from 'moment';

export default function History() {

  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD')); // Formato inicial para comparação

  const [dateRange, setDateRange] = useState([]); // Inicialize como um array vazio

  useEffect(() => {
    getDateList();
  }, []);

  const getDateList = () => {
    const dates = GetPrevDateRangeToDisplay(); // Assumindo que esta função retorna um array de objetos
    setDateRange(dates);
  };

  const GetPrevDateRangeToDisplay = () => {
    // Função simulada que retorna um array de objetos com dados de datas
    const today = moment();
    const range = [];
    for (let i = 6; i >= 0; i--) {
      const date = today.clone().subtract(i, 'days');
      range.push({
        formattedDate: date.format('YYYY-MM-DD'),
        day: date.format('dd'), // Duas primeiras letras do dia da semana
        date: date.format('D'), // Dia do mês
      });
    }
    return range;
  };

  return (
    <View style={styles.mainContainer}>
       <Image source ={require('./../../assets/budgethistor.png')}
         style={styles.imageBanner}
       />
      <Text style={styles.textTitle}>Tela history</Text>


      <FlatList
        data={dateRange}
        horizontal
        style={{ marginTop: 15 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              styles.dateGroup,
              { backgroundColor: item.formattedDate === selectedDate ? '#8B42FC' : '#D3D3D3' },
            ]}
            onPress={() => setSelectedDate(item.formattedDate)}
          >
            <Text
              style={[
                styles.day,
                { color: item.formattedDate === selectedDate ? 'white' : 'black' },
              ]}
            >
              {item.day}
            </Text>
            <Text
              style={[
                styles.date,
                { color: item.formattedDate === selectedDate ? 'white' : 'black' },
              ]}
            >
              {item.date}
            </Text>
          </TouchableOpacity>
        )}
      />


    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    padding: 25,
    backgroundColor: Colors.WHITE,
    height: '100%',
  },
  imageBanner: {
    marginTop: 40,
     width: '100%',
     height:200,
     borderRadius:15,
  },
  textTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20,
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
});
