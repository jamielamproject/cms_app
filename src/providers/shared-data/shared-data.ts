import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { ConfigProvider } from '../config/config';
import { Events, Platform } from 'ionic-angular';
import { LoadingProvider } from '../loading/loading';
// import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Device } from '@ionic-native/device';
// import { Facebook } from '@ionic-native/facebook';
// import { FCM } from '@ionic-native/fcm';

@Injectable()
export class SharedDataProvider {

  public banners;
  public tab1: any;
  public tab2: any;
  public tab3: any;
  public categories = new Array();
  public subCategories = new Array();
  public customerData: { [k: string]: any } = {};
  public recentViewedProducts = new Array();
  public cartProducts = new Array();
  public privacyPolicy;
  public termServices;
  public refundPolicy;
  public aboutUs;
  public cartquantity;
  public wishList = new Array();
  public tempdata: { [k: string]: any } = {};
  public dir = "ltr";
  public selectedFooterPage = "HomePage";

  public orderDetails = {
    delivery_firstname: "",
    delivery_lastname: "",
    delivery_street_address: "",
    delivery_telephone:"",

    billing_firstname: "",
    billing_lastname: "",
    billing_street_address: "",
    billing_telephone:"",

    customers_telephone: "",

    shipping_cost: '',
    shipping_method: '',
    payment_method: '',
    comments: ''
  };

  constructor(
    public config: ConfigProvider,
    public httpClient: HttpClient,
    private storage: Storage,
    public loading: LoadingProvider,
    public events: Events,
    // private push: Push,
    public platform: Platform,
    private device: Device
    // private fcm: FCM
    //private fb: Facebook,
  ) {
    console.log('Share : ');
    //get login data
    storage.get('customerData').then((val) => {
      if (val != null || val != undefined) this.customerData = val;
    });
    //getting all allCategories
    this.httpClient.post(config.url + 'allcategories', { language_id: config.langId }).subscribe((data: any) => {
      for (let value of data.data) {
        if (value.parent_id == 0) this.categories.push(value);
        else this.subCategories.push(value);
      }
    });

    //getting recent viewed items from local storage
    storage.get('cartProducts').then((val) => {
      if (val != null) this.cartProducts = val;
      this.cartTotalItems();
      console.log('cartProducts : ' + JSON.stringify(val));
    });

    //---------------- end -----------------
  }
  //adding into recent array products
//   addToRecent(p) {
//     let found = false;
//     for (let value of this.recentViewedProducts) {
//       if (value.products_id == p.products_id) { found = true; }
//     }
//     if (found == false) {
//       this.recentViewedProducts.push(p);
//       this.storage.set('recentViewedProducts', this.recentViewedProducts);
//     }
//   }
  //removing from recent array products
//   removeRecent(p) {
//     this.recentViewedProducts.forEach((value, index) => {
//       if (value.products_id == p.products_id) {
//         this.recentViewedProducts.splice(index, 1);
//         this.storage.set('recentViewedProducts', this.recentViewedProducts);
//       }
//     });
//   }
  //adding into cart array products
  addToCart(product, attArray) {

    // console.log(this.cartProducts);
    let attributesArray = attArray;
    if (attArray.length == 0 || attArray == null) {
      //console.log("filling attirbutes");
      attributesArray = [];
      if (product.attributes != undefined) {
        // console.log("filling product default attibutes");
        product.attributes.forEach((value, index) => {
          let att = {
            products_options_id: value.option.id,
            products_options: value.option.name,
            products_options_values_id: value.values[0].id,
            options_values_price: value.values[0].price,
            price_prefix: value.values[0].price_prefix,
            products_options_values: value.values[0].value,
            name: value.values[0].value + ' ' + value.values[0].price_prefix + value.values[0].price + " " + this.config.currency
          };
          attributesArray.push(att);
        });
      }
    }
    //  if(checkDublicateService(product.products_id,$rootScope.cartProducts)==false){

    let pprice = product.products_price
    let on_sale = false;
    if (product.discount_price != null) {
      pprice = product.discount_price;
      on_sale = true;
    }
    // console.log("in side producs detail");
    // console.log(attributesArray);
    // console.log(this.cartProducts);
    let finalPrice = this.calculateFinalPriceService(attributesArray) + parseFloat(pprice);
    let obj = {
      cart_id: product.products_id + this.cartProducts.length,
      products_id: product.products_id,
      manufacture: product.manufacturers_name,
      customers_basket_quantity: 1,
      final_price: finalPrice,
      model: product.products_model,
      categories_id: product.categories_id,
      categories_name: product.categories_name,
      // quantity: product.products_quantity,
      weight: product.products_weight,
      on_sale: on_sale,
      unit: product.products_weight_unit,
      image: product.products_image,

      attributes: attributesArray,
      products_name: product.products_name,
      price: pprice,
      subtotal: finalPrice,
      total: finalPrice
    }
    this.cartProducts.push(obj);
    this.storage.set('cartProducts', this.cartProducts);

    this.cartTotalItems();

    // console.log(this.cartProducts);
    //console.log(this.cartProducts);
  }
  //removing from recent array products
  removeCart(p) {
    this.cartProducts.forEach((value, index) => {
      if (value.cart_id == p) {
        this.cartProducts.splice(index, 1);
        this.storage.set('cartProducts', this.cartProducts);
      }
    });
    this.cartTotalItems();
  }
  emptyCart() {
    this.cartProducts = [];
    this.storage.set('cartProducts', this.cartProducts);
    this.cartTotalItems();
  }
//   emptyRecentViewed() {
//     this.recentViewedProducts = [];
//     this.storage.set('recentViewedProducts', this.recentViewedProducts);
//   }
  calculateFinalPriceService(attArray) {
    let total = 0;
    attArray.forEach((value, index) => {
      let attPrice = parseFloat(value.options_values_price);
      if (value.price_prefix == '+') {
        //  console.log('+');
        total += attPrice;
      }
      else {
        //  console.log('-');
        total -= attPrice;
      }
    });
    // console.log("max "+total);
    return total;
  }

  //Function calcualte the total items of cart
  cartTotalItems = function () {
    this.events.publish('cartChange');
    let total = 0;
    for (let value of this.cartProducts) {
      total += value.customers_basket_quantity;
    }
    this.cartquantity = total;
    console.log("cartTotalItems updated");
    return total;
  };

  removeWishList(p) {
    this.loading.show();
    let data: { [k: string]: any } = {};
    data.liked_customers_id = this.customerData.customers_id;
    data.liked_products_id = p.products_id;
    this.httpClient.post(this.config.url + 'unlikeproduct', data).subscribe((data: any) => {
      this.loading.hide();
      if (data.success == 1) {
        this.events.publish('wishListUpdate', p.products_id, 0);
        p.isLiked = 0;
        this.wishList.forEach((value, index) => {
          if (value.products_id == p.products_id) this.wishList.splice(index, 1);
        });
      }
      if (data.success == 0) {

      }
    });
  }
  addWishList(p) {
    this.loading.show();
    let data: { [k: string]: any } = {};
    data.liked_customers_id = this.customerData.customers_id;
    data.liked_products_id = p.products_id;
    this.httpClient.post(this.config.url + 'likeproduct', data).subscribe((data: any) => {
      this.loading.hide();
      if (data.success == 1) {
        this.events.publish('wishListUpdate', p.products_id, 1);
        p.isLiked = 1;
      }

      if (data.success == 0) { }
    });
  }


  login(data) {
    this.customerData = data;
    this.storage.set('customerData', this.customerData);
    // this.subscribePush();
  }
  logOut() {
    this.loading.autoHide(500);
    this.customerData = {};
    this.storage.set('customerData', this.customerData);
    // this.fb.logout();
  }

  //============================================================================================
  //getting token and passing to server
//   subscribePush() {
//     // alert("called");
//     // const options: PushOptions = {
//     //   android: {},
//     //   ios: {
//     //     alert: 'true',
//     //     badge: true,
//     //     sound: 'false',
//     //     // fcmSandbox: true
//     //   },
//     // };
//     // const pushObject: PushObject = this.push.init(options);
//     // pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

//     // pushObject.on('registration').subscribe((registration: any) => {
//     //   alert("registration" + registration.registrationId);
//     //   this.storage.set('registrationId', registration.registrationId);
//     //   this.registerDevice();
//     //   // console.log('Device registered', registration)
//     // });

//     // pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

//     this.fcm.subscribeToTopic('marketing');

//     this.fcm.getToken().then(token => {
//       //alert("registration" + token);
//       console.log(token);
//       //this.storage.set('registrationId', token);
//       this.registerDevice(token);
//     })

//     this.fcm.onNotification().subscribe(data => {
//       if (data.wasTapped) {
//         console.log("Received in background");
//       } else {
//         console.log("Received in foreground");
//       };
//     })

//     this.fcm.onTokenRefresh().subscribe(token => {
//       // this.storage.set('registrationId', token);
//       this.registerDevice(token);
//     })
//   }

  //============================================================================================
  //registering device for push notification function
//   registerDevice(registrationId) {
//     //this.storage.get('registrationId').then((registrationId) => {
//     console.log(registrationId);
//     let data: { [k: string]: any } = {};
//     if (this.customerData.customers_id == null)
//       data.customers_id = null;
//     else
//       data.customers_id = this.customerData.customers_id;
//     //	alert("device ready fired");
//     let deviceInfo = this.device;
//     data.device_model = deviceInfo.model;
//     data.device_type = deviceInfo.platform;
//     data.device_id = registrationId;
//     data.device_os = deviceInfo.version;
//     data.manufacturer = deviceInfo.manufacturer;
//     data.ram = '2gb';
//     data.processor = 'mediatek';
//     data.location = 'empty';

//     // alert(JSON.stringify(data));
//     this.http.post(this.config.url + "registerDevices", data).map(res => res.json()).subscribe(data => {
//       //  alert(registrationId + " " + JSON.stringify(data));
//     });
//     //  });

//   }

//   showAd() {
//     //this.loading.autoHide(2000);
//     this.events.publish('showAd');
//   }

}
//  return new Promise(resolve => {
    //     resolve(data.product_data);
    //   });