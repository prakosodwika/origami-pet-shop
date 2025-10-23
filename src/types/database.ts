export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: number,
          name: string,
          image_path: string,
          created_at: string,
        }
      },
      products: {
        Row: {
          id: number	
          created_at: string	
          sku: string	
          image_path: string	
          name: string	
          description: string	
          price: number	
          discount: number	
          rating: number	
          available: boolean	
          detail: string	
          category_id	: number	
          categories: {
            id: number,
            name: string,
            image_path: string,
          }
        }
      },
      wishlists: {
        Row: {
          id: number,
          product_id: number,
          created_at: string,
          products: {
            id: number,
            sku: string,
            name: string,
            image_path: string,
            price: number,
            discount: number,
            rating: number,
            available: boolean,
            category_id: number,
            categories: {
              id: number,
              name: string,
            }
          }
        }
      },
      carts: {
        Row: {
          id: number,
          product_id: number,
          quantity: number,
          created_at: string,
          products: {
            id: number,
            sku: string,
            name: string,
            image_path: string,
            price: number,
            discount: number,
            available: boolean,
            category_id: number,
            categories: {
              id: number,
              name: string,
            }
          }
        }
      },
      addresses: {
        Row: {
          id: number,
          name: string,
          recipient: string,
          phone: string,
          street: string,
          province: string,
          country: string,
          postal_code: string,
          created_at: string,
        }
      },
      payment_methods: {
        Row: {
          id: number,
          bank_account: string,
          account_name: string,
          account_number: string,
          created_at: string,
        }
      },
      transactions: {
        Row: {
          id: number,
          order_id: string,
          order_placed: string,
          estimated_delivery: string,
          ship_id: number,
          total: number,
          addresses: {
            id: number,
            name: string,
          }
        }
      },
      transaction_lines: {
        Row: {
          id: number,
          transaction_id: number,
          product_id: number,
          quantity: number,
          created_at: string,
          products: {
            id: number,
            sku: string,
            name: string,
            image_path: string,
            price: number,
            discount: number,
            available: boolean,
            category_id: number,
            categories: {
              id: number,
              name: string,
            },
          }
        }
      }
    }
  }
}