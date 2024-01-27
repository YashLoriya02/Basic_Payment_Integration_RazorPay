import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useSearchParams } from "react-router-dom"
const PaymentSuccess = () => {
    const seachQuery = useSearchParams()[0]
    const referenceNumber = seachQuery.get("reference")
    return (
        <Box>
            <VStack h="100vh" justifyContent={"center"}>
                <Heading textTransform={"uppercase"}> Order Successful </Heading>
                <Text>
                    Reference No :- {referenceNumber}
                </Text>
            </VStack>
        </Box>
    )
}

export default PaymentSuccess
