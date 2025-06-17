import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  // Statistics data

  stats = [
    { number: '15+', label: 'Years of Experience' },
    { number: '10K+', label: 'Happy Customers' },
    { number: '500+', label: 'Products Available' },
    { number: '50+', label: 'Top Brands' }
  ];

  // Team members data
  teamMembers = [
    {
      name: 'Ahmed Mohamed',
      position: 'Store Manager',
      description: '15+ years experience in sports retail with expertise in tennis and football equipment.',
      icon: 'fas fa-user-tie'
    },
    {
      name: 'Sarah Ali',
      position: 'Sports Consultant',
      description: 'Former professional athlete specializing in running and fitness equipment recommendations.',
      icon: 'fas fa-user-circle'
    },
    {
      name: 'Omar Hassan',
      position: 'Technical Advisor',
      description: 'Expert in sports technology and equipment maintenance with 10+ years of experience.',
      icon: 'fas fa-user-cog'
    }
  ];

  // Company values
  values = [
    {
      icon: 'fas fa-star',
      title: 'Quality',
      description: 'We only stock products from trusted brands that meet our high standards for durability and performance.',
      color: 'text-warning'
    },
    {
      icon: 'fas fa-users',
      title: 'Service',
      description: 'Our knowledgeable team is always ready to help you find the right equipment for your sport and skill level.',
      color: 'text-success'
    },
    {
      icon: 'fas fa-handshake',
      title: 'Trust',
      description: 'We build lasting relationships with our customers through honest advice and reliable service.',
      color: 'text-info'
    }
  ];

  constructor(private router: Router) { }
  ngOnInit(): void {
    this.animateStats();
  }


  // دالة للتنقل إلى صفحة المتجر
  navigateToShop(): void {
    this.router.navigate(['/shop']);
  }

  // دالة للتنقل إلى صفحة الاتصال
  navigateToContact(): void {
    this.router.navigate(['/contact']);
  }

  // دالة لتحريك الأرقام الإحصائية (اختيارية)
  private animateStats(): void {
    // يمكن إضافة منطق تحريك الأرقام هنا
    // مثل استخدام setTimeout أو مكتبة للتحريك
  }

  // دالة للتعامل مع النقر على عضو الفريق
  onTeamMemberClick(member: any): void {
    console.log('Team member clicked:', member.name);
    // يمكن إضافة منطق إضافي هنا مثل فتح modal أو صفحة تفاصيل
  }

  // دالة للتمرير السلس إلى قسم معين
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
