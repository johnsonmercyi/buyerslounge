document.addEventListener('DOMContentLoaded', function(event) {
  console.log("Content loaded!");
  localStorage.setItem("cart", JSON.stringify({
    items: [

    ]
  }));

  const addToCart = document.querySelector("#addToCart");
  const item = document.querySelector("#item");
  const cart = JSON.parse(localStorage.getItem("cart"));

  addToCart.addEventListener('click', () => {
    if (!item.value) {
      alert("Please enter an item to add to cart!");
    } else {
      const item = {
        product: "wlgcduiawsdgcuidc",
        qty: 12,
        total: 5000
      }
      cart.items.push(item);

      // Print the cart!
      console.log("OUR CART: ", cart);
    }
  });

});













const payload = {
  sale: {
    customerId: '12345',
    saleTotal: '2000'
  },
  saleItems: [
    { productId: 'egg_id', qty: 5, total: 2000 },
    { productId: 'milk_id', qty: 2, total: 500 },
    { productId: 'onions_id', qty: 4, total: 1500 },
  ]
}








// Request payload

{
  "sale": {
    "customerId": "6044bf6d-ccf3-4ae2-a96b-2d54c3a588e9",
      "saleTotal": 550
  },
  "saleItems": [
    { "productId": "7b7a468a-bbf2-4bf2-939e-72eb5c70dcbd", "qty": 1, "total": 150, "sellerId": "87d02d31-c90a-4f82-8c73-6ed01f1e8877" },
    { "productId": "56af4330-8cbd-47a1-b47f-fbff2e19b1a0", "qty": 1, "total": 400, "sellerId": "87d02d31-c90a-4f82-8c73-6ed01f1e8877" }
  ]
}











// Response

{
  "id": "2d8a466b-e25c-4f36-aea5-84bdbc235c6f",
    "customer": {
      "customerId": "5813c4df-81d0-47b2-aaa8-755a3dfc4aad",
      "customerName": "Jane Doe",
      "customerEmail": "emmaokeke@gmail.com"
    },
  "saleTotal": 1600.0,
    "saleItems": [
      {
        "id": "0cd5904a-b91f-471d-9c88-8699161a5f2f",
        "product": {
          "id": "fce2ba8b-369d-460b-af41-0632c733895c",
          "category": {
            "id": "fd0e8764-52e8-4bb8-ae9b-92c1a5aca810",
            "name": "well-beings"
          },
          "name": "KY Tooth Brush",
          "cost": 150.0,
          "price": 200.0,
          "refNo": "bacbe227-18c2-425a-be18-bee6bab98dd1"
        },
        "seller": {
          "id": "87d02d31-c90a-4f82-8c73-6ed01f1e8877",
          "name": "Mark Seller 1",
          "email": "markseller_1@email.com"
        },
        "quantity": 1,
        "total": 400.0,
        "created": null,
        "updated": null
      },
      {
        "id": "653c7288-4cab-41f2-9b2b-2556f5673897",
        "product": {
          "id": "56af4330-8cbd-47a1-b47f-fbff2e19b1a0",
          "category": {
            "id": "fd0e8764-52e8-4bb8-ae9b-92c1a5aca810",
            "name": "well-beings"
          },
          "name": "Colgate Tooth Paste",
          "cost": 800.0,
          "price": 950.0,
          "refNo": "68900dd6-63ba-4f23-b7f4-f9263980448f"
        },
        "seller": {
          "id": "8b4ca4d1-08ec-482c-b72f-d0347f980d95",
          "name": "Bruno Fernandes",
          "email": "mrbruno@gmail.com"
        },
        "quantity": 1,
        "total": 400.0,
        "created": null,
        "updated": null
      },
      {
        "id": "9c76536f-eb62-4c66-a709-c644fc49f616",
        "product": {
          "id": "fcf45151-6f3c-4bd3-a160-0f5201b3c13a",
          "category": {
            "id": "17068de9-e265-4da2-8348-ffb50009bbb2",
            "name": "phamarceuticals"
          },
          "name": "Crate of Eggs",
          "cost": 1250.0,
          "price": 1450.0,
          "refNo": "7dca2baf-a417-4834-a0ae-ad0da9269e02"
        },
        "seller": {
          "id": "87d02d31-c90a-4f82-8c73-6ed01f1e8877",
          "name": "Mark Seller 1",
          "email": "markseller_1@email.com"
        },
        "quantity": 1,
        "total": 400.0,
        "created": null,
        "updated": null
      },
      {
        "id": "46052d0e-abd0-41ca-93fc-723748a098d0",
        "product": {
          "id": "c423e958-7f7f-41b1-aac5-95440781c067",
          "category": {
            "id": "a93fa9ae-3a7f-4b56-a09d-16257a2230f3",
            "name": "dairies"
          },
          "name": "Creamed Milk",
          "cost": 400.0,
          "price": 500.0,
          "refNo": "c360160b-6623-48c1-88ea-afa49b282bf8"
        },
        "seller": {
          "id": "8b4ca4d1-08ec-482c-b72f-d0347f980d95",
          "name": "Bruno Fernandes",
          "email": "mrbruno@gmail.com"
        },
        "quantity": 1,
        "total": 400.0,
        "created": null,
        "updated": null
      }
    ],
      "created": null,
        "updated": null
}

@JoinColumn(name = "product_id", referencedColumnName = "id", nullable = false)
  private Product product;
  
  @Column(nullable = false)
  private int quantity;

  {
    "productId": "19017dad-99a5-4db8-86f2-355fa00fec6c",
    "quantity": 300
  }

  {
    "productId":[
      {}
    ],
    "quantity": 300
  }