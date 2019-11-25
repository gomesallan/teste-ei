import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import api from '../services/api';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Header,
  TouchableOpacity,
  FlatList,
  View,
} from 'react-native';

import Colors from '../constants/Colors';
import '../config/StatusBarConfig';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  state = {
    especialidades: []
  }
  componentDidMount(){
    this.loadProducts();
  }

  loadProducts =  async () => {
      const response = await api.get("/especialidades/");

      this.setState({ especialidades: response.data.especialidades });
  };

  renderItem = ({ item }) => (
    <View style={
      Platform.OS === 'web'
          ? styles.especialidadeContainer1
          : styles.especialidadeContainer
      }>
      <Text style={styles.especialidadeTitle}>{ item.especialidade}</Text>
      <TouchableOpacity style={styles.especialidadeButton} onPress={() => {}}>
        <Text style={styles.especialidadeButtonText}>Acessar</Text>
      </TouchableOpacity>
    </View>
  )

  render(){
    return (
      <View style={styles.container}>
        
        <FlatList 
        contentContainerStyle={
          Platform.OS === 'web'
          ? styles.list1
          : styles.list
        }
        numColumns={
          Platform.OS === 'web'
          ? 2
          : 1
        }
        data={this.state.especialidades}
        keyExtractor={item => item.id}
        renderItem={this.renderItem}
        />
      </View>
    );
  }
  
}
if(Platform.OS === 'web'){
  HomeScreen.navigationOptions = {
    header:null,
  };

}else{
  HomeScreen.navigationOptions = {
    title: 'eiDoctor',
    headerStyle: {
      backgroundColor: Colors.tintColor,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: "#fafafa",
  },

  list:{
    padding:20,
  },

  list1:{
    marginVertical:20,
    
    justifyContent: 'center',
    alignItems:'center',
    flexBasis: 0,
  },

  especialidadeContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius:5,
    padding:20,
    marginBottom:20,
  },
  especialidadeContainer1: {
    backgroundColor: "#fff",
    
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius:5,
    marginBottom:20,
    padding:20,
    marginLeft:20,
    width:450,
  },
 
  especialidadeTitle:{
    fontSize:18,
    fontWeight:"bold",
    color: "#333",
  },
  especialidadeButton:{
    height:42,
    borderRadius:5,
    borderWidth:2,
    borderColor: Colors.tintColor,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  especialidadeButtonText:{
    fontSize: 16,
    color:Colors.tintColor,
    fontWeight:'bold',
  },
})


