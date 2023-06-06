import React from "react";
import { Flex } from "@pancakeswap/uikit";
import ListBoxes from "./ListBoxes";
import ListShoes from "./ListShoes";
import AquaDream from "./AquaDream";

interface Props {
    isListBoxes?: boolean
    filterType?: number
    query?: string
}

const InventoryOffChain: React.FC<Props> = ({ isListBoxes, filterType, query }) => {
    return (
        <Flex width="100%" flexDirection="row">
            <AquaDream />
        </Flex>
    )
}
export default InventoryOffChain