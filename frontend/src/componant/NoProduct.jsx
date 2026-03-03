import React from 'react'
import '../componentStyles/NoProducts.css'
function NoProduct({keyword}) {
  return (
    <div className='no-product-content'>
        <div className='no-products-icon'>
            <h3 className='no-products-title'>No Product Found</h3>
            <p className='no-product-message'>
                {
                    keyword ? `We coulfnot find any product ${keyword}`:`"No product are available"`
                }
            </p>
        </div>
      
    </div>
  )
}   
export default NoProduct
