import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import styles from "../css/Map.module.css"
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

// Ensure marker images are correctly referenced in production builds (Vite)
// so default Leaflet markers show up instead of placeholder characters.
// Known leaflet bug:
// https://stackoverflow.com/questions/41144319/leaflet-marker-not-found-production-env
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
})

function Map() {
  return (
    <div>
      <MapContainer className={styles.map} center={[59.435, 24.748]} zoom={12.5} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[59.433, 24.752]}>
          <Popup>
            Solaris keskus. <br /> Avatud 9-22.
          </Popup>
        </Marker>
        <Marker position={[59.427, 24.723]}>
          <Popup>
            Kristiine keskus. <br /> Avatud 9-22.
          </Popup>
        </Marker>
        <Marker position={[59.422, 24.794]}>
          <Popup>
            Ülemiste keskus. <br /> Avatud 9-22.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
export default Map