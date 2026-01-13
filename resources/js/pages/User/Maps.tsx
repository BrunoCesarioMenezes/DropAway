import { GoogleMap, useJsApiLoader, Marker, Polyline } from '@react-google-maps/api';

const containerStyle = { width: '100%', height: '100%' };

// Coordenadas dos pontos que você quer conectar
const pontosDaViagem = [
  { lat: -23.5505, lng: -46.6333 }, // São Paulo
  { lat: -22.9068, lng: -43.1729 }, // Rio de Janeiro
  { lat: -19.9167, lng: -43.9345 }, // Belo Horizonte
];

export default function Maps({isLoaded, markers, center} : {isLoaded: boolean, markers: any[], center: {lat: number, lng: number}}) {

  // Configurações visuais da linha
  const options = {
    strokeColor: "#ede021", // Azul do Tailwind (blue-600)
    strokeOpacity: 0.8,
    strokeWeight: 4,
    geodesic: true, // Faz a linha seguir a curvatura da Terra
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={6}
    >
      {/* Desenha os marcadores nos pontos */}
      {markers.map((ponto, index) => (
        <Marker key={index} position={ponto} />
      ))}

      {/* Desenha a linha conectando todos os pontos do array */}
      <Polyline
        path={markers}
        options={options}
      />
    </GoogleMap>
  ) : null;
}
