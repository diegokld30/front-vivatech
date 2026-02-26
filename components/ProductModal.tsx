"use client";

import type { Product } from "@/types/api";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { Image } from "@heroui/image";
import { useState, useEffect } from "react";
import { PlayCircle } from "lucide-react";

import { WHATSAPP_NUMBER } from "@/lib/constants";

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal = ({
  product,
  isOpen,
  onClose,
}: ProductModalProps) => {
  const [selectedImage, setSelectedImage] = useState<string>(
    product.cover || "/placeholder.jpg",
  );

  // Lógica para detectar si hay video válido
  const isYouTube =
    product.video_url?.includes("youtube.com") ||
    product.video_url?.includes("youtu.be");
  const videoId = isYouTube
    ? product.video_url?.split("v=")[1]?.split("&")[0]
    : null;

  // Estado para controlar si mostramos Video o Imagen
  // Si hay video, iniciamos mostrándolo. Si no, imagen.
  const [showVideo, setShowVideo] = useState<boolean>(!!(isYouTube && videoId));

  // Resetear estados cuando cambia el producto abiero
  useEffect(() => {
    if (isOpen) {
      setSelectedImage(product.cover || "/placeholder.jpg");
      setShowVideo(!!(isYouTube && videoId));
    }
  }, [product, isOpen, isYouTube, videoId]);

  const handleSelectImage = (imgSrc: string) => {
    setSelectedImage(imgSrc);
    setShowVideo(false); // Ocultar video al seleccionar imagen
  };

  const handleSelectVideo = () => {
    setShowVideo(true);
  };

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      scrollBehavior="inside"
      size="5xl"
      onClose={onClose}
    >
      <ModalContent className="max-h-[90vh]">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <p className="text-sm text-default-500 font-normal">
                {product.category?.name}
              </p>
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  {/* VISUALIZADOR PRINCIPAL */}
                  {showVideo && isYouTube && videoId ? (
                    <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
                      <iframe
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        frameBorder="0"
                        height="100%"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                        title="YouTube video player"
                        width="100%"
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden border-1 border-default-200 shadow-sm bg-white flex items-center justify-center relative">
                      <Image
                        alt={product.name}
                        className="object-contain w-full h-full"
                        src={selectedImage}
                      />
                      {product.cover && selectedImage === product.cover && (
                        <span className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                          Portada
                        </span>
                      )}
                    </div>
                  )}

                  {/* CARRUSEL DE MINIATURAS (Galería + botón video) */}
                  <div className="flex gap-2 overflow-x-auto py-2 px-1">
                    {/* Botón para volver al Video (si existe) */}
                    {isYouTube && videoId && (
                      <button
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all flex items-center justify-center bg-black/10 hover:bg-black/20 ${showVideo ? "border-primary" : "border-transparent"}`}
                        title="Ver Video"
                        onClick={handleSelectVideo}
                      >
                        <PlayCircle className="w-8 h-8 text-danger" />
                      </button>
                    )}

                    {/* Portada */}
                    {product.cover && (
                      <button
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${!showVideo && selectedImage === product.cover ? "border-primary" : "border-transparent"}`}
                        onClick={() => handleSelectImage(product.cover!)}
                      >
                        <img
                          alt="Portada"
                          className="w-full h-full object-cover"
                          src={product.cover}
                        />
                      </button>
                    )}

                    {/* Galería extra */}
                    {product.gallery?.map((img) => (
                      <button
                        key={img.id}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${!showVideo && selectedImage === img.image ? "border-primary" : "border-transparent"}`}
                        onClick={() => handleSelectImage(img.image)}
                      >
                        <img
                          alt="Galería"
                          className="w-full h-full object-cover"
                          src={img.image}
                        />
                      </button>
                    ))}
                  </div>

                  {/* Botón fallback para video NO-YouTube */}
                  {product.video_url && !isYouTube && (
                    <div className="p-4 bg-default-100 rounded-lg">
                      <p className="text-sm font-semibold mb-2">
                        Video disponible:
                      </p>
                      <Button
                        as="a"
                        color="secondary"
                        href={product.video_url}
                        rel="noopener noreferrer"
                        size="sm"
                        target="_blank"
                        variant="flat"
                      >
                        Ver Video Externo
                      </Button>
                    </div>
                  )}
                </div>

                {/* COLUMNA DERECHA: INFO */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Descripción</h3>
                    <div
                      dangerouslySetInnerHTML={{ __html: product.description }}
                      className="text-default-700 rich-text px-1"
                    />
                  </div>

                  {product.specifications &&
                    Object.keys(product.specifications).length > 0 && (
                      <div>
                        <h3 className="text-xl font-bold mb-3 border-b pb-2">
                          Especificaciones Técnicas
                        </h3>
                        <div className="bg-default-50 rounded-lg overflow-hidden border border-default-200">
                          <table className="w-full text-sm text-left">
                            <tbody>
                              {Object.entries(product.specifications).map(
                                ([key, value], idx) => (
                                  <tr
                                    key={key}
                                    className={
                                      idx % 2 === 0 ? "bg-default-100/50" : ""
                                    }
                                  >
                                    <th className="py-3 px-4 font-semibold text-default-700 w-1/3 border-r border-default-200">
                                      {key}
                                    </th>
                                    <td className="py-3 px-4 text-default-600">
                                      {value}
                                    </td>
                                  </tr>
                                ),
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                  {product.price && !product.hide_price && (
                    <div className="p-4 bg-primary-50 rounded-xl border border-primary-200">
                      <p className="text-lg font-semibold text-primary-900">
                        Precio estimado
                      </p>
                      <p className="text-3xl font-bold text-primary-600">
                        {Number(product.price).toLocaleString("es-CO", {
                          style: "currency",
                          currency: "COP",
                          minimumFractionDigits: 0,
                        })}
                      </p>
                      <p className="text-xs text-primary-700 mt-1">
                        * Precios sujetos a cambios. Contactar para cotización
                        final.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cerrar
              </Button>
              <Button
                as="a"
                className="font-semibold shadow-md"
                color="primary"
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, estoy interesado en el producto: ${product.name}. Me gustaría recibir una cotización.`)}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                Solicitar Cotización
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
