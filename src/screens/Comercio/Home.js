import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
  });

  const addProduct = () => {
    if (newProduct.name && newProduct.price) {
      setProducts([...products, { ...newProduct, id: Date.now() }]);
      setNewProduct({ name: '', price: '', description: '' });
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>DomiGo - Panel de Control</Text>
      </View>

      <View style={styles.content}>
        {/* Products Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Productos</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addButtonText}>+ Agregar Producto</Text>
          </TouchableOpacity>
          
          <ScrollView style={styles.list}>
            {products.map((product) => (
              <View key={product.id} style={styles.productItem}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>${product.price}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Orders Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pedidos Activos</Text>
          <ScrollView style={styles.list}>
            {orders.map((order) => (
              <View key={order.id} style={styles.orderItem}>
                <Text style={styles.orderNumber}>Pedido #{order.id}</Text>
                <Text style={styles.orderStatus}>Estado: {order.status}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Add Product Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Agregar Producto</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Nombre del producto"
            value={newProduct.name}
            onChangeText={(text) => setNewProduct({...newProduct, name: text})}
            placeholderTextColor="#666"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Precio"
            value={newProduct.price}
            onChangeText={(text) => setNewProduct({...newProduct, price: text})}
            keyboardType="numeric"
            placeholderTextColor="#666"
          />
          
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descripción"
            value={newProduct.description}
            onChangeText={(text) => setNewProduct({...newProduct, description: text})}
            multiline
            placeholderTextColor="#666"
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.saveButton]}
              onPress={addProduct}
            >
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#FFD700',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  addButtonText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  list: {
    maxHeight: 200,
  },
  productItem: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productName: {
    color: '#fff',
    fontSize: 16,
  },
  productPrice: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderItem: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  orderNumber: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderStatus: {
    color: '#FFD700',
    marginTop: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#222',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 100,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
    color: '#fff',
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 15,
    borderRadius: 8,
    width: '45%',
  },
  cancelButton: {
    backgroundColor: '#444',
  },
  saveButton: {
    backgroundColor: '#FFD700',
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});