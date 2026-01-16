import { GoogleMap, Marker, Polyline } from '@react-google-maps/api';

const containerStyle = { width: '100%', height: '100%' };

export default function Maps({isLoaded, markers, center}
    : {isLoaded: boolean, markers: unknown[], center: {lat: number, lng: number}}) {

    const markersTyped = markers as {lat: number, lng: number}[];

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
        {markersTyped.map((ponto, index) => (
            <Marker key={index} position={ponto} />
        ))}

        {/* Desenha a linha conectando todos os pontos do array */}
        <Polyline
            path={markersTyped}
            options={options}
        />
        </GoogleMap>
    ) : null;
}
