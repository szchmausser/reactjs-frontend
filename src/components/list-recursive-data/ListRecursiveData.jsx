import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  IoChevronBackCircle,
  IoChevronForwardSharp,
  IoChevronDownSharp,
} from "react-icons/io5";
import {
  FaRegFolder,
  FaFolderClosed,
  FaFolderOpen,
  FaFile,
} from "react-icons/fa6";

export default function ListRecursiveData() {
  const [currentFolders] = useState([
    {
      name: "Folder",
      folders: [
        {
          name: "Movies",
          folders: [
            {
              name: "Horror",
              folders: [
                { name: "Horror 1", folders: [] },
                { name: "Horror 2", folders: [{ name: "Horror movie.mp4" }] },
                {
                  name: "Horror 3",
                  folders: [
                    {
                      name: "Horror 3.1",
                      folders: [{ name: "Horror 3.1.1", folders: [] }],
                    },
                  ],
                },
              ],
            },
            {
              name: "Comedy",
              folders: [
                { name: "Comedy 1", folders: [{ name: "Comedy movie.mp4" }] },
                { name: "Comedy 2", folders: [] },
              ],
            },
            { name: "Action", folders: [] },
          ],
        },

        { name: "Documents", folders: [] },
        { name: "Downloads", folders: [] },
      ],
    },
    {
      name: "Music",
      folders: [
        { name: "Rock", folders: [] },
        { name: "Jazz", folders: [] },
        { name: "Pop", folders: [] },
      ],
    },
    {
      name: "Pictures",
      folders: [
        { name: "Nature", folders: [] },
        { name: "Sports", folders: [] },
        { name: "Animals", folders: [] },
        { name: "File.png" },
      ],
    },
  ]);

  return (
    <>
      <div className="flex w-full min-h-screen">
        <div className="container flex flex-wrap px-5 py-24 mx-auto break-words">
          <div className="w-full">
            <div className="flex justify-end">
              <Link
                to={-1}
                className="px-4 py-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
              >
                <div className="inline-flex justify-start items-center">
                  <IoChevronBackCircle />
                  <span className="hidden ml-2 md:block">Go back</span>
                </div>
              </Link>
            </div>
            {/* Aqui empieza propiamente el contenido del componente ListRecursiveData */}
            <div>
              <ul>
                <ul className="pl-6">
                  {/* Empezamos a iterar el objeto currentFolders (el listado carpetas) */}
                  {currentFolders.map((folder) => (
                    // Llamamos al componente que muestra los detalles de cada objeto contenido en currentFolders y le pasamos el objeto actual folder
                    <Folder folder={folder} key={folder.name} />
                  ))}
                </ul>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const Folder = ({ folder }) => {
  const [isFolderOpen, setIsFolderOpen] = useState(false);

  return (
    <li key={folder.name} className="my-1.5">
      <span className="flex items-center gap-1.5 text-black dark:text-white">
        {/* Boton para la accion de abrir carpetas */}
        {/* Si el objeto actual (la carpeta) tiene una propiedad folders, agregamos una flechita (boton para abrir carpeta) a la izquierda */}
        {folder.folders?.length > 0 ? (
          // Segun el estado que indica si este cerrada a no la carpeta, indicamos la direccion del icono de flecha
          isFolderOpen ? (
            // Si la carpeta esta abierta, mostramos una flecha con direccion abajo
            <IoChevronDownSharp
              className="-ml-8 text-sky-500 size-6"
              onClick={() => setIsFolderOpen(!isFolderOpen)}
            />
          ) : (
            // Si la carpeta esta cerrada, mostramos una flecha con direccion hacia la derecha
            <IoChevronForwardSharp
              className="-ml-8 text-sky-500 size-6"
              onClick={() => setIsFolderOpen(!isFolderOpen)}
            />
          )
        ) : (
          // Para compensar que en este caso no se le coloca ninguna flecha (boton), reducimos un poco el margen hacia la izquierda
          // para que no se desalineen la carpetas vacias respecto a las carpetas que no estan vacias
          <span className="-ml-2"></span>
        )}

        {/* Establecer icono de carpetas o archivo, segun si tiene o no la propiedad folder */}
        {/* Tener la propiedad "folders", significa que es una carpeta */}
        {folder.folders ? (
          // Si es una carpeta y esta abierta, mostrar el icono de carpeta abierta
          isFolderOpen ? (
            <FaFolderOpen className="text-sky-500 size-6" />
          ) : folder.folders?.length > 0 ? (
            // Icono de carpeta cerrada con elementos dentro
            <FaFolderClosed className="text-sky-500 size-6" />
          ) : (
            // Icono de carpeta cerrada sin elementos dentro
            <FaRegFolder className="text-sky-500 size-6" />
          )
        ) : (
          // No tener la propiedad "folders", significa que es una archivo
          <FaFile className="text-sky-500 size-6" />
        )}
        {folder.name}
      </span>

      {/* Si es una carpeta, llamar a este mismo componente aplicando recursividad para que se muestren los elementos de esta subcarpeta */}
      {folder.folders && isFolderOpen && (
        <ul className="pl-6">
          {folder.folders?.map((folder) => (
            <Folder folder={folder} key={folder.name} />
          ))}
        </ul>
      )}
    </li>
  );
};

Folder.propTypes = {
  folder: PropTypes.object.isRequired,
};
