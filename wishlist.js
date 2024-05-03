// SaveScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const SaveScreen = ({ route }) => {
  const { title, deskripsi, address, uploaderUid, id } = route.params;
  const [loadedData, setLoadedData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the saved data when the component mounts
    fetchSavedData(id);
  }, [id]);

  const fetchSavedData = async (documentId) => {
    try {
      // Fetch the saved data using the documentId
      const docRef = doc(FIREBASE_DB, 'TODOS', documentId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setLoadedData(data);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching saved data:', error);
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <Text>Title: {loadedData?.title}</Text>
          <Text>Alamat: {loadedData?.address}</Text>
          <Text>Description: {loadedData?.deskripsi}</Text>
        </View>
      )}
    </View>
  );
};

export default SaveScreen;
