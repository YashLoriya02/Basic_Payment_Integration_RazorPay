import React from 'react'
import { Text, Image, VStack, Button } from '@chakra-ui/react'

const Card = ({ amount, img, checkoutHandler }) => {
    return (
        <div>
            <VStack>
                <Image src={img} height={250} width={300} />
                <Text>Rs - {amount}</Text>
                <Button style={{backgroundColor : "#2faaf6"}} onClick={() => checkoutHandler(amount)}>Buy Now</ Button>
            </VStack>
        </div>
    )
}

export default Card
