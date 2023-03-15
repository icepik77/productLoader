import { productAction } from "@/store/product/product.slice";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit"

const allActions = {
    ...productAction
}

export const useActions = () => {
    const dispatch = useDispatch()

    return bindActionCreators(allActions, dispatch)
}