import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
} from 'react-native-document-picker';

const Group = ({ route }: any) => {
  console.log(route.params, 'MY PROPS MAN');
  const { name, classroom, description, group_id } = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);
  const [result, setResult] = React.useState<
    Array<DocumentPickerResponse> | DirectoryPickerResponse | undefined | null
  >();

  useEffect(() => {
    console.log(JSON.stringify(result, null, 2), 'FILE');
  }, [result]);

  const CustomButton = ({ text, onPress }: any) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <Text
          style={text === 'Atrás' ? styles.backButton : styles.publishButton}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  };

  const Description = () => {
    return (
      <Modal
        transparent={true}
        animationType={'slide'}
        visible={descriptionModalVisible}
        onRequestClose={() =>
          setDescriptionModalVisible(!descriptionModalVisible)
        }>
        <TouchableWithoutFeedback
          onPress={() => setDescriptionModalVisible(false)}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '75%',
                backgroundColor: 'white',
                paddingHorizontal: 20,
                paddingVertical: 20,
                borderRadius: 10,
                bottom: 50,
              }}>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: '500',
                  color: '#444',
                  marginBottom: 5,
                }}>
                Descripción
              </Text>
              <Text style={{ color: 'grey' }}>{description}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  const NewActivity = () => {
    const [title, setTitle] = useState('');
    const [descriptionActivity, setDescriptionActivity] = useState('');

    return (
      <Modal
        transparent={true}
        animationType={'slide'}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.buttonsRow}>
              <CustomButton
                text={'Atrás'}
                onPress={() => setModalVisible(!modalVisible)}
              />
              <CustomButton text={'Publicar'} onPress={() => null} />
            </View>
            <View style={{ marginHorizontal: 20, marginTop: 10 }}>
              <Text
                style={{ color: 'black', fontSize: 12, fontWeight: 'bold' }}>
                Titulo
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Tarea 1.5 - Proyecto Final"
                placeholderTextColor="grey"
                value={title}
                onChangeText={value => setTitle(value)}
              />
              <Text
                style={{ color: 'black', fontSize: 12, fontWeight: 'bold' }}>
                Descripción
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Descripcion"
                placeholderTextColor="grey"
                value={descriptionActivity}
                onChangeText={value => setDescriptionActivity(value)}
              />
            </View>
            <View style={styles.uploadFileContainer}>
              <Text
                style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>
                Subir archivo
              </Text>
              <TouchableOpacity
                style={styles.uploadFile}
                activeOpacity={0.6}
                onPress={onDocumentPress}>
                <Text style={{ textAlign: 'center', color: '#838383' }}>
                  Subir un archivo...
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  const onDocumentPress = async () => {
    try {
      const url = 'http://192.168.100.4:3000';
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      if (res[0].size! < 50000000) {
        let data = new FormData();
        data.append('file', res);

        try {
          const responseOfFileUpload = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            body: data,
          });
          if (responseOfFileUpload.status === 200) {
            let responseInJS = await responseOfFileUpload.json();
            let fileName = responseInJS.fileName;

            Alert.alert('Archivo', 'Se subió correctamente el archivo.');
          } else {
            Alert.alert('Archivo', 'Ocurrió un error al subir el archivo..');
          }
        } catch (err) {
          Alert.alert('Archivo', 'Ocurrió un error al subir el archivo..');
          console.log(err, 'Error al subir el archivo');
        }
      } else {
        Alert.alert('Archivo', 'El archivo no debe pesar mas de 50 MB');
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Archivo', 'No se seleccionó ningún archivo.');
      } else {
        throw err;
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setDescriptionModalVisible(!descriptionModalVisible)}>
        <ImageBackground
          source={require('../../imgs/background.jpg')}
          style={styles.backgroundImage}
          borderRadius={10}>
          <View
            style={{
              marginHorizontal: 20,
              top: 20,
            }}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.subtitle}>Grupo {classroom}</Text>
          </View>
          <View
            style={{
              marginHorizontal: 20,
              top: 45,
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                textShadowOffset: {
                  width: 0,
                  height: 1,
                },
                textShadowRadius: 5,
                textShadowColor: 'rgba(0,0,0,0.5)',
              }}>
              Código de invitación: {group_id}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.announcementButton}
        onPress={() => setModalVisible(!modalVisible)}>
        <View style={styles.announcementContainer}>
          <Image
            source={require('../../imgs/avatar.png')}
            style={styles.logo}
          />
          <Text style={styles.announcementTitle}>
            Anuncia algo a la clase...
          </Text>
        </View>
      </TouchableOpacity>
      <NewActivity />
      <Description />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 5,
    backgroundColor: 'white',
  },
  backgroundImage: {
    width: '100%',
    height: 130,
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 22,
  },
  modalView: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  buttonsRow: {
    paddingHorizontal: '5%',
    paddingVertical: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    borderColor: 'rgba(0,0,0,.4)',
  },
  publishButton: {
    color: 'black',
    fontWeight: '500',
    padding: 10,
  },
  backButton: {
    color: 'black',
    fontWeight: '500',
    padding: 10,
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  announcementButton: {
    width: '100%',
    borderRadius: 5,
    marginTop: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  announcementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 1,
  },
  announcementTitle: {
    fontSize: 12,
    color: 'grey',
  },
  input: {
    width: '100%',
    borderRadius: 5,
    height: 40,
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: '#dadada',
    marginTop: 5,
    marginBottom: 5,
    fontSize: 12,
  },
  uploadFileContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    height: 300,
  },
  uploadFile: {
    marginTop: 20,
    height: 250,
    backgroundColor: '#b6ffde',
    justifyContent: 'center',
    borderRadius: 30,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: 'black',
  },
});

export default Group;
