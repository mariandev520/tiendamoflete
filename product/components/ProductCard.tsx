
import * as React from 'react';
import {Stack,Button, Text, Image, Flex,Badge,Modal,useDisclosure,ModalBody,ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,ModalFooter, Divider, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, StatGroup} from "@chakra-ui/react";
import {motion, AnimatePresence, AnimateSharedLayout} from "framer-motion";
import { AddIcon, PlusSquareIcon, ViewIcon} from '@chakra-ui/icons'
import {parseCurrency} from "../../utils/currency";
import {CartItem} from "../../cart/types";
import {Product} from "../types";
import CartItemDrawer from '../../cart/components/CartItemDrawer';

import "animate.css";




interface Props {
  product: Product;
  onAdd: (product: Product) => void;
}


const ProductCard: React.FC<Props> = ({product, onAdd}) => {
  const [selectedImage ,setSelectedImage] = React.useState<string>(null);
  const [isModalOpen, toggleModal ] = React.useState(false);
  const cartItem = React.useMemo<CartItem>(() => ({...product, quantity: 1}), [product]);

  function BasicUsage() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
      
      <Button color="purple"  onClick={onOpen}><ViewIcon color="cyan.500" ></ViewIcon></Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader color="purple">{product.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Image
          as={motion.img}
            backgroundColor="white"
            borderRadius="md"
            cursor="pointer"
            layoutId={product.image}
           
            src={product.image}
            width="100"
            
          
          />
        
            </ModalBody>



            <ModalFooter>
            <Text color="purple">{product.description}</Text>
             
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
  

  return (
    <>

    <AnimateSharedLayout type="crossfade">
 
 
      <Stack
        key={product.id}
        alignItems="center"
        borderColor="gray.100"
        borderRadius="md"
        borderWidth={1}
        data-testid="product"
        direction="row"
        justifyContent="space-between"
        spacing={3}
      >
        <Stack direction="row" padding={2} spacing={4} width="100%">
          <Image
          as={motion.img}
            backgroundColor="white"
            borderRadius="md"
            cursor="pointer"
            layoutId={product.image}
            height={{base: 24, sm: 36}}
            loading="lazy"
            minWidth={{base: 24, sm: 36}}
            objectFit="contain"
            src={product.image}
            width={{base: 24, sm: 36}}
          
          />
          {BasicUsage()}
            <AnimatePresence >
          {selectedImage && <Flex   
          key="backdrop" alignItems="left" 
          as={motion.div} 
          backgroundColor="rgba(0,0,0,0.5)"
          justifyContent="center"
          position="fixed"
          layoutId={selectedImage}
          top={0}
          left={0}
          height="85%"
          width="80%"
          objectFit='cover'
                          >
              <Image   key="image" src={selectedImage} />
          </Flex> }
              
      </AnimatePresence>
          <Stack justifyContent="space-between" spacing={1} width="100%">
            <Stack spacing={1}>
            <Badge colorScheme='purple'>{product.title}</Badge>
              <Text color="gray.500" fontSize="sm">
                {product.description}
              </Text>
            </Stack>
            <Stack alignItems="flex-end" direction="row" justifyContent="space-between">
              <Text color="brand" fontSize="sm" fontWeight="500">
              {parseCurrency(product.price)}
              </Text>
  )         
            { selectedImage==(null)  && 
            
              <Button className="animate__animated animate__flash animate__slow	2s animate__infinite	infinite"
              color="purple" 
                size="sm"
                bgColor="yellow.100"
               
              
                 onClick={() => (product.options ? toggleModal(true) : onAdd(cartItem))}
              >
                comprar
              </Button> 
             
 }            

              
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      {isModalOpen && (
        <CartItemDrawer
          isOpen
          item={cartItem}
          onClose={() => toggleModal(false)}
          onSubmit={(item: CartItem) => {
            onAdd(item);
            toggleModal(false);
          }}
        />
      )}
  
  </AnimateSharedLayout>


    </>
      
  );
};

export default ProductCard;
