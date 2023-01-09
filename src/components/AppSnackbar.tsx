import { Snackbar } from 'react-native-paper';
import { useReduxDispatch, useReduxSelector } from '~hooks/redux';
import { dismissSnackbar } from '~redux/slices/uiSlice';

const AppSnackbar: React.FC = () => {
  const dispatch = useReduxDispatch();
  const snackbar = useReduxSelector(state => state.ui.snackbar);

  return (
    <Snackbar
      visible={snackbar.isVisible}
      onDismiss={() => dispatch(dismissSnackbar())}
      action={{
        label: 'Dismiss',
        onPress: () => dispatch(dismissSnackbar()),
      }}>
      {snackbar.message}
    </Snackbar>
  );
};

export default AppSnackbar;
