import { StyleSheet, Text, View } from 'react-native';
import Main from './Main';
import { Provider } from 'react-redux';
import { store } from './stateManagement/store';
import { StripeProvider } from '@stripe/stripe-react-native';
export default function App() {
  const publishableKey =
    'pk_test_51JTFjTSBJxYHREkUpzfarxCYkdDN171AiVJimDtmzXFVm5Wzpr1bvEfqNWTagB0H1JsszEwSJ0gM7gLrnBL7DD9P00Nq86FLbO';
  return (
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier='MD-Shop' // required for Apple Pay
      threeDSecureParams={{
        backgroundColor: '#fff',
        timeout: 5,
      }}
    >
      <Provider store={store}>
        <Main />
      </Provider>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
