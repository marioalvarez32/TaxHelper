export class MercadoSellerSearchResponse {
  Paging: MercadoSellerSearchPaging;
  Results: MercadoSellerSearchResult[];
  Seller: MercadoSellerSearchSeller;
  SiteId: 'MLM';
  Sort: MercadoSellerSearchSort;

  constructor(response: any) {
    this.Paging = new MercadoSellerSearchPaging(response.paging);
    this.Results = response.results.map((result: any) => new MercadoSellerSearchResult(result));
  }
}

class MercadoSellerSearchPaging {
  Limit: number;
  Offset: number;
  PrimaryResults: number;
  Total: number;

  constructor(paging: any) {
    if (!paging) return;
    this.Limit = paging.limit;
    this.Offset = paging.offset;
    this.PrimaryResults = paging.primary_results;
    this.Total = paging.total;
  }
}

export class MercadoSellerSearchResult {
  Id: number;
  Title: string;
  Condition: string;
  ThumbnailId: string;
  CatalogProductId: string;
  ListingTypeId: string;
  Permalink: string;
  BuyingMode: string;
  CategoryId: string;
  DomainId: string;
  Thumbnail: string;
  CurrencyId: string;
  OrderBackend: number;
  Price: number;
  OriginalPrice: number;
  SalePrice: number;
  AvailableQuantity: number;
  OfficialStoreId: number;
  UseThumbnailId: boolean;
  AccesptsMercadopago: boolean;
  Shipping: MercadoSellerSearchShipping;
  StopTime: string;
  Seller: MercadoSellerSearchSeller;

  constructor(result: any) {
    this.Id = result.id;
    this.Title = result.title;
    this.Condition = result.condition;
    this.ThumbnailId = result.thumbnail_id;
    this.CatalogProductId = result.catalog_product_id;
    this.ListingTypeId = result.listing_type_id;
    this.Permalink = result.permalink;
    this.BuyingMode = result.buying_mode;
    this.CategoryId = result.category_id;
    this.DomainId = result.domain_id;
    this.Thumbnail = result.thumbnail;
    this.CurrencyId = result.currency_id;
    this.OrderBackend = result.order_backend;
    this.Price = result.price;
    this.OriginalPrice = result.original_price;
    this.SalePrice = result.sale_price;
    this.AvailableQuantity = result.available_quantity;
    this.OfficialStoreId = result.official_store_id;
    this.UseThumbnailId = result.use_thumbnail_id;
    this.AccesptsMercadopago = result.accespts_mercadopago;
    this.Shipping = new MercadoSellerSearchShipping(result.shipping);
    this.StopTime = result.stop_time;
    this.Seller = new MercadoSellerSearchSeller(result.seller);
  }
}

class MercadoSellerSearchSeller {
  Id: number;
  Nickname: string;

  constructor(seller) {
    if (!seller) return;
    this.Id = seller.id;
    this.Nickname = seller.nickname;
  }
}

class MercadoSellerSearchSort {
  Id: string;
  Name: string;

  constructor(sort) {
    this.Id = sort.id;
    this.Name = sort.name;
  }
}

class MercadoSellerSearchShipping {
  FreeShipping: boolean;
  Mode: string;
  Tags: string[];
  LogisticType: string;
  StorePickUp: boolean;

  constructor(shipping: any) {
    if (!shipping) return;
    this.FreeShipping = shipping.free_shipping;
    this.Mode = shipping.mode;
    this.Tags = shipping.tags;
    this.LogisticType = shipping.logistic_type;
    this.StorePickUp = shipping.store_pick_up;
  }
}
