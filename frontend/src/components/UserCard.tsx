import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { User } from '@/models/UserInterfaces';
import * as React from 'react';

export default function UserCard({ user } : { user: User}){
    return (
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={user.image}
            title="user photo"
          />
          <CardContent>
            <Typography variant='subtitle1'>Name: {user.name}</Typography>
            <Typography variant='subtitle1'>Surname: {user.surname}</Typography>
            <Typography variant='subtitle1'>Email: {user.email}</Typography>
          </CardContent>
        </Card>
    );
}