import AsyncStorage from '@react-native-async-storage/async-storage';


export const Store = async(name,value)=>{
    const values = await AsyncStorage.setItem(name,value);
    
}
export const Get = async(name)=>{
    const values = await AsyncStorage.getItem(name);
    return values
}

export const Remove = async(name)=>{
    const values = await AsyncStorage.setItem(name,"");
  
}