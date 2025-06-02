
import GoogleBookingMap from "./GoogleBookingMap";

interface BookingMapProps {
  location: string;
  address?: string;
}

const BookingMap = ({ location, address }: BookingMapProps) => {
  return <GoogleBookingMap location={location} address={address} />;
};

export default BookingMap;
