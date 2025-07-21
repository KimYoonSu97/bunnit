import { Dimensions, StyleSheet } from 'react-native';
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width,
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dayHeader: {
    width,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
  },
  dayHeaderItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayHeaderItemText: {
    textAlign: 'center',
  },
});

export default styles;
