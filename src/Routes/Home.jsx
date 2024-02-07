import { signOut, getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// Importaciones para la base de datos
import { database } from '../firebase/firebase.config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
// Importaciones para las alertas
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// Iconos
import {
  RiEdit2Line,
  RiDeleteBin2Line,
  RiLogoutBoxRLine,
} from 'react-icons/ri';

export function Home() {
  const [products, setProducts] = useState([]);
  const MySwal = withReactContent(Swal);
  // Autenticacion
  const auth = getAuth();

  async function handleSignOut() {
    try {
      await signOut(auth);
      console.log('hola');
    } catch (error) {
      console.log(error);
    }
  }

  const SignOut = () => {
    handleSignOut();
  };

  const producsCollection = collection(database, 'productos');

  const getProducts = async () => {
    const data = await getDocs(producsCollection);
    const productsData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setProducts(productsData);
    console.log(products);
  };

  const deleteProducts = async (id) => {
    const productDoc = doc(database, 'productos', id);
    await deleteDoc(productDoc);
    getProducts();
  };

  const alertDelete = (id) => {
    MySwal.fire({
      title: '¿Eliminar Producto?',
      text: 'No podras revertir los cambios',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProducts(id);
        Swal.fire('Eliminado!', 'El Producto ha sido eliminado', 'Correcto');
      }
    });
  };

  useEffect(() => {
    const producsCollection = collection(database, 'productos');
    const getProducts = async () => {
      const data = await getDocs(producsCollection);
      const productsData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProducts(productsData);
    };

    getProducts();
  }, []);

  return (
    <div>
      {/* Barra de Navegación */}
      <nav className="bg-gray-800 p-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-white text-xl font-bold">
            GESTION BODEGA
          </Link>
          <button onClick={SignOut} className="text-white">
            <RiLogoutBoxRLine className="w-7 h-7" />
          </button>
        </div>
      </nav>

      {/* Contenido Principal */}
      <div className="container mx-auto p-4 lg:p-8">
        <h1 className="text-xl lg:text-2xl font-bold mb-6 lg:mb-10 text-center">
          INVENTARIO DE PRODUCTOS
        </h1>
        <div className="flex flex-col lg:flex-row justify-between items-center mb-4 lg:mb-5">
          <h1 className="text-xl lg:text-2xl font-bold mb-6 lg:mb-10"> </h1>
          <button className="bg-gray-700 text-white py-2 px-4 rounded">
            <Link to={`/create`}>AGREGAR</Link>
          </button>
        </div>
        {/* Tabla de Productos */}
        <div className="overflow-x-auto">
          <table className="w-full lg:min-w-max border-collapse border border-gray-800">
            <thead>
              <tr>
                <th className="border border-gray-800 px-2 lg:px-4 py-2">
                  NOMBRE DEL PRODUCTO
                </th>
                <th className="border border-gray-800 px-2 lg:px-4 py-2">
                  CANTIDAD
                </th>
                <th className="border border-gray-800 px-2 lg:px-4 py-2">
                  PRECIO UNITARIO
                </th>
                <th className="border border-gray-800 px-2 lg:px-4 py-2">
                  PRECIO TOTAL
                </th>
                <th className="border border-gray-800 px-2 lg:px-4 py-2">
                  ACCIÓN
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="border border-gray-800 px-2 lg:px-4 py-2">
                    {product.nombre}
                  </td>
                  <td className="border border-gray-800 px-2 lg:px-4 py-2">
                    {product.cantidad}
                  </td>
                  <td className="border border-gray-800 px-2 lg:px-4 py-2">
                    {product.precioU}
                  </td>
                  <td className="border border-gray-800 px-2 lg:px-4 py-2">
                    {product.precioT}
                  </td>
                  <td className="border border-gray-800 px-2 lg:px-4 py-2 ">
                    <div className="flex items-center justify-center lg:justify-start">
                      <Link
                        to={`/edit/${product.id}`}
                        className="text-blue-600 mr-2"
                      >
                        <RiEdit2Line className="w-5 lg:w-7 h-5 lg:h-7" />
                      </Link>
                      <button
                        onClick={() => alertDelete(product.id)}
                        className="text-red-600"
                      >
                        <RiDeleteBin2Line className="w-5 lg:w-7 h-5 lg:h-7" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
