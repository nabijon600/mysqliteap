import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
type Props = {
    title:string
}

const Header = ({title}:Props)=> {
    return (
      <View style={styles.containerIn}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }

const styles = StyleSheet.create({
  containerIn: {
    paddingTop:10,
    height:40,
    shadowColor:'#000',
    shadowOffset:{
        height:3,
        width:0,
    },
    shadowOpacity:0.1,
    shadowRadius:3,
    alignItems:'center',
    backgroundColor:'#fff',
  }, 
  title: {
    fontSize:20,
    fontFamily:'Nunito-Bold',
    color: '#000',
  }
});

export default Header;
