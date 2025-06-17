import { ProductParam } from './../shared/models/ProductParam';
import { Component } from '@angular/core';
import { ICategory } from '../shared/models/category';
import { IProduct } from '../shared/models/product';
import { forkJoin, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { ShopService } from '../shop/shop.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  categories: ICategory[] = [];
  featuredProducts: IProduct[] = [];
  loading = true;
  error: string | null = null;
  private destroy$ = new Subject<void>();
  constructor(private shopService: ShopService,
    private router: Router) { }



  ngOnInit(): void {
    this.loadHomeData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadHomeData(): void {
    this.loading = true;

    // تحضير معاملات المنتجات المميزة
    const featuredProductsParam: ProductParam = {
      PageNumber: 3,
      PageSize: 6,
      MaxPageSize: 10,
      sortSelected: 'priceDesc', // أو أي ترتيب آخر للمنتجات المميزة
      categoryId: 0,
      search: ''
    };

    // استدعاء البيانات بشكل متوازي
    forkJoin({
      categories: this.shopService.getCategory(),
      products: this.shopService.getProduct(featuredProductsParam)
    }).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        this.categories = data.categories;
        this.featuredProducts = data.products.data || [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading home data:', error);
        this.error = 'Failed to load data. Please try again later.';
        this.loading = false;
      }
    });
  }

  addToCart(product: IProduct): void {
    // تنفيذ إضافة المنتج إلى السلة
    // يمكنك استخدام خدمة السلة هنا
    console.log('Adding to cart:', product);

    // مثال على إظهار رسالة نجاح
    // يمكنك استخدام مكتبة مثل ngx-toastr للإشعارات
    alert(`${product.name} added to cart successfully!`);
  }

  onCategoryClick(categoryId: number): void {
    this.router.navigate(['/shop'], {
      queryParams: { categoryId: categoryId }
    });
  }

  onViewAllProducts(): void {
    this.router.navigate(['/shop']);
  }

  onProductClick(productId: number): void {
    this.router.navigate(['/shop/details', productId]);
  }

  // دالة للتعامل مع الاشتراك في النشرة الإخبارية
  onNewsletterSubscribe(email: string): void {
    if (email && this.isValidEmail(email)) {
      // هنا يمكنك إضافة منطق الاشتراك في النشرة الإخبارية
      console.log('Newsletter subscription for:', email);
      alert('Thank you for subscribing to our newsletter!');
    } else {
      alert('Please enter a valid email address.');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // دالة لإعادة تحميل البيانات في حالة الخطأ
  onRetryLoad(): void {
    this.error = null;
    this.loadHomeData();
  }

  // دالة للتنقل إلى صفحة معينة
  navigateToShop(categoryId?: number): void {
    if (categoryId) {
      this.router.navigate(['/shop'], {
        queryParams: { categoryId: categoryId }
      });
    } else {
      this.router.navigate(['/shop']);
    }
  }
}
