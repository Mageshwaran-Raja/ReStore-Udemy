import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import agent from '../../app/api/agent';
import { toast } from 'react-toastify';

export default function Register() {

    const navigate = useNavigate();
    const { register, handleSubmit, setError, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: 'onTouched'
    });

    function handleApiError(errors: any) {
        if (errors) {
            errors.forEach((error: string) => {
                if (error.includes('Password')) {
                    setError('password', { message: error });
                } else if (error.includes('Email')) {
                    setError('email', { message: error });
                } else if (error.includes('Username')) {
                    setError('username', { message: error });
                }
            });
        }
    }


    return (
        <Container component={Paper} maxWidth="sm"
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Register
            </Typography>
            <Box component="form"
                onSubmit={handleSubmit(data => agent.Account.register(data)
                    .then(() => {
                        toast.success('Registration successful - you can now login');
                        navigate('/login');
                    })
                    .catch(error => handleApiError(error)))}
                noValidate sx={{ mt: 1 }} >
                <TextField
                    margin="normal"
                    fullWidth
                    id="Username"
                    label="Username"
                    autoFocus
                    {...register('username', { required: 'username is required' })}
                    error={!!errors.username} // cast the username to a boolean
                    helperText={errors?.username?.message?.toString()}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    id="email"
                    label="email"
                    {...register('email', {
                        required: 'email is required',
                        pattern: {
                            value: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
                            message: 'Not a valid email address'
                        }
                    })}
                    error={!!errors.email}
                    helperText={errors?.email?.message?.toString()}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    {...register('password', {
                        required: 'password is required',
                        pattern: {
                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
                            message: 'Password does not meet complexity requirements'
                        }
                    })}
                    error={!!errors.password} // cast the password to a boolean
                    helperText={errors?.password?.message?.toString()}
                />
                <LoadingButton
                    loading={isSubmitting}
                    disabled={!isValid}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Register
                </LoadingButton>
                <Grid container>
                    <Grid item>
                        <Link to="/login">
                            {"Already have an account? Sign In"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}