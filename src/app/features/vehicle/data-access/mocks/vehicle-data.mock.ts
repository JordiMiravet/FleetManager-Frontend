import { VehicleInterface } from '../../models/vehicle';

const MOCK_VEHICLES_DATA: Omit<VehicleInterface, '_id'>[] = [
  {
    name: 'Mercedes GLC',
    model: 'GLC Coupe',
    plate: '3887-VHH',
    imageUrl: 'https://placehold.co/400x250?text=Mercedes+GLC',
    location: { lat: 41.3821, lng: 2.1768 },
    users: [],
  },
  {
    name: 'Mercedes AMG S-65',
    model: 'AMG S-65 Final Edition',
    imageUrl: 'https://placehold.co/400x250?text=Mercedes+AMG+S65',
    plate: '4972-ZYL',
    location: { lat: 41.4012, lng: 2.1811 },
    users: [],
  },
  {
    name: 'Mercedes AMG GT',
    model: 'AMG GT Black Series',
    imageUrl: 'https://placehold.co/400x250?text=Mercedes+AMG+GT',
    plate: '8841-JKL',
    location: { lat: 41.3945, lng: 2.1705 },
    users: [],
  },
  {
    name: 'Porsche 911',
    model: '911 Turbo S',
    imageUrl: 'https://placehold.co/400x250?text=Porsche+911',
    plate: '9927-PQR',
    location: { lat: 41.3856, lng: 2.1623 },
    users: [],
  },
  {
    name: 'Ferrari LaFerrari',
    model: 'LaFerrari',
    imageUrl: 'https://placehold.co/400x250?text=Ferrari+LaFerrari',
    plate: '7348-LFR',
    location: { lat: 41.3902, lng: 2.154 },
    users: [],
  },
  {
    name: 'Pagani Huayra',
    model: 'Huayra BC',
    imageUrl: 'https://placehold.co/400x250?text=Pagani+Huayra',
    plate: '9182-PGH',
    location: { lat: 41.3874, lng: 2.1686 },
    users: [],
  },
  {
    name: 'Ducati Panigale',
    model: 'Panigale R 1299 Final Edition',
    imageUrl: 'https://placehold.co/400x250?text=Ducati+Panigale',
    plate: '6124-DFG',
    location: { lat: 41.3768, lng: 2.1492 },
    users: [],
  },
];

export const MOCK_VEHICLES: VehicleInterface[] = MOCK_VEHICLES_DATA.map(
  (vehicle, index) => ({
    _id: String(index + 1),
    ...vehicle,
  }),
);