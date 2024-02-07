import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { database } from '../firebase/firebase.config';

export const Edit = () => {
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const [precioU, setPrecioU] = useState(0);
  const [, setPrecioT] = useState(0);

  const navigate = useNavigate();
  const { id } = useParams();

  const update = async (e) => {
    e.preventDefault();
    const precioTotal = precioU * cantidad;
    const product = doc(database, 'productos', id);
    const data = {
      nombre: nombre,
      cantidad: cantidad,
      precioU: precioU,
      precioT: precioTotal,
    };
    await updateDoc(product, data);
    navigate('/home');
  };

  const getProductById = async (id) => {
    const product = await getDoc(doc(database, 'productos', id));
    if (product.exists()) {
      console.log(product.data());
      setNombre(product.data().nombre);
      setCantidad(product.data().cantidad);
      setPrecioU(product.data().precioU);
      setPrecioT(product.data().precioT);
    } else {
      console.log('El producto no existe');
    }
  };

  useEffect(() => {
    getProductById(id);
  }, [id]);

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 shadow-md rounded-md mt-20">
      <h1 className="text-2xl font-bold mb-10 text-center">EDITAR PRODUCTO</h1>
      <form onSubmit={update}>
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-sm font-semibold mb-1">
            NOMBRE:
          </label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            required
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="cantidad"
            className="block text-sm font-semibold mb-1"
          >
            CANTIDAD:
          </label>
          <input
            id="cantidad"
            type="number"
            value={cantidad}
            required
            onChange={(e) => setCantidad(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="precioU" className="block text-sm font-semibold mb-1">
            PRECIO UNITARIO:
          </label>
          <input
            id="precioU"
            type="number"
            value={precioU}
            required
            onChange={(e) => setPrecioU(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="precioT" className="block text-sm font-semibold mb-1">
            PRECIO TOTAL:
          </label>
          <input
            id="precioT"
            readOnly
            type="number"
            value={precioU * cantidad}
            onChange={(e) => setPrecioT(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none bg-gray-100"
          />
        </div>
        <div className="flex justify-between items-center mt-10">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            ACTUALIZAR
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md">
            <Link to={'/home'}>REGRESAR</Link>
          </button>
        </div>
      </form>
    </div>
  );
};
