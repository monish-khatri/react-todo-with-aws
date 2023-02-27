import './App.css';
import { useState, useEffect, Fragment } from 'react';
import Switch from "react-switch";
import { BsSunFill, BsFillMoonStarsFill } from 'react-icons/bs'
import TaskContainer from './Components/TaskContainer';
import { Auth } from 'aws-amplify';
import awsmobile from './aws-exports';
import { Authenticator, Button, Heading, Image, Text, useAuthenticator, useTheme, View } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

Auth.configure(awsmobile);

// Custom Confirm Sign Up footer with a Footer Information message
const components = {
  Header() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Image
          alt="Amplify logo"
          src="https://docs.amplify.aws/assets/logo-dark.svg"
        />
      </View>
    );
  },

  Footer() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Text color={tokens.colors.neutral[80]}>
          &copy; All Rights Reserved
        </Text>
      </View>
    );
  },

  SignIn: {
    Header() {
      const { tokens } = useTheme();

      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Sign in to your account
        </Heading>
      );
    },
    Footer() {
      const { toResetPassword } = useAuthenticator();

      return (
        <View textAlign="center">
          <Button
            fontWeight="normal"
            onClick={toResetPassword}
            size="small"
            variation="link"
          >
            Reset Password
          </Button>
        </View>
      );
    },
  },

  SignUp: {
    Header() {
      const { tokens } = useTheme();

      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Create a new account
        </Heading>
      );
    },
    Footer() {
      const { toSignIn } = useAuthenticator();

      return (
        <View textAlign="center">
          <Button
            fontWeight="normal"
            onClick={toSignIn}
            size="small"
            variation="link"
          >
            Back to Sign In
          </Button>
        </View>
      );
    },
  },
  ConfirmSignUp: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
  SetupTOTP: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
  ConfirmSignIn: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
  ResetPassword: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
  ConfirmResetPassword: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
};

const formFields = {
  signIn: {
    username: {
      placeholder: 'Enter your email',
    },
  },
  signUp: {
    username: {
      placeholder: 'Enter username:',
      isRequired: true,
      order: 1,
    },
    password: {
      label: 'Password:',
      placeholder: 'Enter your Password:',
      isRequired: true,
      order: 3,
    },
    confirm_password: {
      label: 'Confirm Password:',
      isRequired: true,
      order: 4,
    },
    email: {
      label: 'Enter Email:',
      isRequired: true,
      order: 2,
    },
  },
  forceNewPassword: {
    password: {
      placeholder: 'Enter your Password:',
    },
  },
  resetPassword: {
    username: {
      placeholder: 'Enter your email:',
    },
  },
  confirmResetPassword: {
    confirmation_code: {
      placeholder: 'Enter your Confirmation Code:',
      label: 'New Label',
      isRequired: false,
    },
    confirm_password: {
      placeholder: 'Enter your Password Please:',
    },
  },
  setupTOTP: {
    QR: {
      totpIssuer: 'test issuer',
      totpUsername: 'amplify_qr_test_user',
    },
    confirmation_code: {
      label: 'New Label',
      placeholder: 'Enter your Confirmation Code:',
      isRequired: false,
    },
  },
  confirmSignIn: {
    confirmation_code: {
      label: 'New Label',
      placeholder: 'Enter your Confirmation Code:',
      isRequired: false,
    },
  },
};
const SignOutHtml = () => {
  const { signOut, user } = useAuthenticator();

  return (
    <Fragment>
      <h4>Hello {user.username}</h4>
      <Button
        fontWeight="normal"
        size="small"
        onClick={signOut}
        variation="link"
        >
        Sign Out
      </Button>
    </Fragment>
  )
}
function App() {

  const [tasks, setTasks] = useState([])
  const [dark, setDark] = useState(true);
  useEffect(() => {
    let myTodo = localStorage.getItem('myTodoTasks');
    if (myTodo) {
        setTasks(JSON.parse(myTodo))
    }
}, [])

  return (
    <Authenticator formFields={formFields} components={components}>
      <div className={`${dark ? 'darkMode-App' : "lightMode-App"} App`}>
        <div className={`${dark ? 'darkMode-app-title-container' : "lightMode-app-title-container"} app-title-container`}>
          <div className='flex-container'>
            <div className='flex-child authentication-left-sidenav'>
              <h1 className='app-title'>Manage TODO</h1>
            </div>
            <div className='flex-child authentication-mid-sidenav'>
              <Switch
                checked={dark}
                onChange={() => setDark(!dark)}
                uncheckedIcon={<div className='check-sun-btn' ><BsSunFill size={18} /></div>}
                checkedIcon={<div className='check-moon-btn'><BsFillMoonStarsFill size={18} /></div>} />
            </div>
            <div className='flex-child authentication-right-sidenav'>
              <SignOutHtml />
            </div>
          </div>
        </div>
        <TaskContainer tasks={tasks} setTasks={setTasks} dark={dark} />
      </div >
    </Authenticator>
  );
}

export default App;
