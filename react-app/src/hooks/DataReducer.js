export default function dataReducer(data, action) {
  switch (action.type) {
    case 'removeData': 
      return { account: null, expense: null };
    case 'setAcc': 
      return { ...data, account: action.account };
    case 'setExpense': 
      return { ...data, expense: action.expense }; 
    case 'setGallery': 
      return { ...data, gallery: action.gallery }; 
    default:
      return { ...data }; 
  }
}
