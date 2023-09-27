import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import axios from 'axios';

const newsApiUrl = 'https://newsapi.org/v2/everything';
const apiKey = '6dc558ac45a144798fefdf0687fea6b9';

export default function App() {
  const [newsData, setNewsData] = useState(null);
  const [connectedMessage, setConnectedMessage] = useState('');

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await axios.get(newsApiUrl, {
          params: {
            q: 'Apple',
            apiKey: apiKey,
          },
        });

        setNewsData(response.data);
        setConnectedMessage('Conectado');
      } catch (error) {
        console.error('Error al obtener datos de las noticias', error);
        setConnectedMessage('Error al conectar con la API');
      }
    };

    fetchNewsData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.connectedMessage}>{connectedMessage}</Text>

      {newsData ? (
        <ScrollView>
          <Text style={styles.header}>Estado: {newsData.status}</Text>
          <Text style={styles.header}>Total de Resultados: {newsData.totalResults}</Text>
          {newsData.articles.map((articulo, index) => (
            <View key={index} style={styles.articuloContainer}>
              <Text style={styles.titulo}>{articulo.title}</Text>
              <Text style={styles.descripcion}>{articulo.description}</Text>
              <Image source={{ uri: articulo.urlToImage }} style={styles.imagen} />
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.cargando}>Cargando datos...</Text>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    padding: 30,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  articuloContainer: {
    marginTop: 20,
    padding: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'red',
  },
  titulo: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  descripcion: {
    fontSize: 12,
  },
  imagen: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 10,
  },
  cargando: {
    fontSize: 16,
    marginTop: 10,
  },
  connectedMessage: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
