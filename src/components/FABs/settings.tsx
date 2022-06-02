import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

interface Info {
  title?: string;
  info?: string;
}

export const Settings = () => {
  const data = JSON.parse(useSelector((state: any) => state.AuthReducers.auth));

  console.log(data);
  const [tempUri, setTempUri] = useState<string>();

  const InfoItem = ({ title, info }: Info) => {
    return (
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.info}>{info}</Text>
      </View>
    );
  };

  const takePhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      res => {
        if (res.didCancel) {
          return;
        }
        if (!res.assets) {
          return;
        }
        setTempUri(res.assets[0].uri);
      },
    );
  };

  const photoGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      res => {
        if (res.didCancel) {
          return;
        }
        if (!res.assets) {
          return;
        }
        setTempUri(res.assets[0].uri);
      },
    );
  };

  return (
    <View style={styles.container}>
      {!tempUri && (
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
          }}
          style={styles.image}
        />
      )}
      {tempUri && (
        <Image
          source={{
            uri: tempUri,
          }}
          style={styles.image}
        />
      )}
      <TouchableOpacity onPress={photoGallery} activeOpacity={0.7}>
        <Text style={{ textAlign: 'center', color: 'grey', marginBottom: 40 }}>
          Seleccionar foto
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={takePhoto}
        style={styles.editContainer}>
        <FontAwesome size={20} name={'camera'} color={'white'} />
      </TouchableOpacity>
      <InfoItem title={'Nombre(s)'} info={data.name} />
      <InfoItem title={'Apellido(s)'} info={data.lastname} />
      <InfoItem title={'Correo electrónico'} info={data.email} />
      <InfoItem title={'Ocupación'} info={data.role} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: '5%',
    paddingTop: '20%',
  },
  editContainer: {
    position: 'absolute',
    width: 45,
    height: 45,
    backgroundColor: '#38CC94',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    right: 110,
    top: 180,
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 100,
  },
  infoContainer: {
    backgroundColor: '#e7e7e7',
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    height: 60,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#38CC94',
  },
  info: {
    fontSize: 14,
    fontWeight: '500',
    color: '#383838',
  },
});
