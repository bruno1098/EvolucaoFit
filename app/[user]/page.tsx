import UserPageClient from './UserPageClient';
import { workoutData } from '../data/workouts';

// Static params for build
export function generateStaticParams() {
  return [
    { user: 'nayara' },
    { user: 'bruno' }
  ];
}

export default function UserPage({ params }: { params: { user: string } }) {
  const userData = workoutData[params.user as keyof typeof workoutData];
  
  if (!userData) {
    return <div>User not found</div>;
  }

  const workouts = params.user === 'nayara' 
    ? userData.protocolo_boneca_de_aco.treinos 
    : userData.treinos;

  return <UserPageClient userData={userData} workouts={workouts} />;
}