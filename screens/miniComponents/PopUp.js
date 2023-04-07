import React,{useState} from 'react'
import { View } from 'react-native';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
const PopUp = () => {
    const [visible,setVisible]=useState(fasle)
    return (
        <View>
            <Dialog
                visible={visible}
                onTouchOutside={() => {
                    setVisible(false);
                }}
            >
                <DialogContent>
                    <Text>
                        jhjgjhgr
                    </Text>
                </DialogContent>

            </Dialog>
        </View>
    )
}
export default PopUp;