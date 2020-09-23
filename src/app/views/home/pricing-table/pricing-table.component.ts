import { Component, OnInit } from '@angular/core';
import { PricingTableModel } from 'src/app/_models';

@Component({
  selector: 'app-pricing-table',
  templateUrl: './pricing-table.component.html',
  styleUrls: ['./pricing-table.component.scss']
})
export class PricingTableComponent implements OnInit {

  model: PricingTableModel = {
    Heading: 'Pricing',
    SubHeading: 'Register today and enjoy our premium tutoring tailored to your needs on demand & exclusive.',
    prices: [
      {
        cardHeader:'Primary School',
        imageUrl:'assets/images/home/bus.svg',
        price: '750',
        frequency: '(Once-Off)',
        validity: 'Valid For 6 Months',
        offeringPrices: [
          {
            price:'R70',
            frequency:'(P/M)',
            validity:'Per Subject'
          },
          {
            price:'R250',
            frequency:'(P/H)',
            validity:'Live Stream(Video)'
          },
          {
            price:'Email/Chat',
             validity:'Support'
          },
          {
            price:'1 User',
             validity:'Profile(s)'
          },
        ]
      },
      {
        cardHeader:'High School',
        imageUrl:'assets/images/home/school.svg',
        price: 'R850',
        frequency: '(Once-Off)',
        validity: 'Valid For 6 Months',
        offeringPrices: [
          {
            price:'R70',
            frequency:'(P/M)',
            validity:'Per Subject'
          },
          {
            price:'R250',
            frequency:'(P/H)',
            validity:'Live Stream(Video)'
          },
          {
            price:'Email/Chat',
             validity:'Support'
          },
          {
            price:'1 User',
             validity:'Profile(s)'
          },
        ]
      },
      {
        cardHeader:'Tertiary Institute',
        imageUrl:'assets/images/home/varsity.svg',
        price: 'R2500',
        frequency: '(Once-Off)',
        validity: 'Valid For 6 Months',
        offeringPrices: [
          {
            price:'R120',
            frequency:'(P/M)',
            validity:'Per Subject'
          },
          {
            price:'R350',
            frequency:'(P/H)',
            validity:'Live Stream(Video)'
          },
          {
            price:'Email/Chat',
             validity:'Support'
          },
          {
            price:'1 User',
             validity:'Profile(s)'
          },
        ]
      },

    ]
  };

  constructor() { }

  ngOnInit() {
  }

}
