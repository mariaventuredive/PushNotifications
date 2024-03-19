
import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from './../../../todosSlice';

const MyHome = ({ navigation }) => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const loading = useSelector((state) => state.todos.loading);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleDetails = (item) => {
    navigation.navigate('HomeDetails', { chatId: item.id });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleDetails(item)} style={styles.item}>
      <Text style={styles.title}>ID: {item.id}</Text>
      <Text style={styles.text}>Name: {item.name}</Text>
      <Text style={styles.text}>Username: {item.username}</Text>

      <Text style={styles.text}>  Catch Phrase: {item.company.catchPhrase}</Text>
      <Text style={styles.text}>  BS: {item.company.bs}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList data={todos} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  completed: {
    fontSize: 16,
  },
});

export default MyHome;
