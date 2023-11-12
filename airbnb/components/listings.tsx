import { useEffect } from 'react';
import {View, Text} from 'react-native'

interface Props {
    listings:any[]; //Listing data
    category:string;
}
export const Listings = ({listings, category} :Props) => {

    useEffect(()=> {
console.log('RELOAD LISTING');

    }, [])
  return (
    <View>
<Text>Listings</Text>
    </View>
  );
}