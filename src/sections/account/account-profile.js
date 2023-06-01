import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';

const user = {
  avatar: '',
  city: 'Aveiro',
  country: 'Portugal',
  jobTitle: 'Junior Developer',
  name: 'Tomás Oliveira',
  timezone: 'GTM-7'
};

export const AccountProfile = () => (
  <Card sx={{backgroundColor:"rgb(255,255,255,0.2)", border:"1px solid white"}}>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            height: 80,
            mb: 2,
            width: 80
          }}
        />
        <Typography
          gutterBottom
          variant="h5"
          color="common.white"
        >
          {user.name}
        </Typography>
        <Typography
          color="common.white"
          variant="body2"
        >
          {user.city} {user.country}
        </Typography>
        <Typography
          color="common.white"
          variant="body2"
        >
          {user.timezone}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button
        fullWidth
        variant="text"
        sx={{color:"white",backgroundColor:"black",
          '&:hover': {
            backgroundColor: "rgb(0,0,0,0.1)",
          },
        }}
      >
        Upload picture
      </Button>
    </CardActions>
  </Card>
);
