import { Component, OnInit } from '@angular/core';

interface DataItem {
  name: string;
  city: string;
  address: string;
}

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  searchValue = '';
  visible = false;
  listOfData: DataItem[] = [
    {
      name: 'John Brown',
      city: 'London',
      address: 'New York No. 1 Lake Park'
    },
    {
      name: 'Jim Green',
      city: 'London',
      address: 'London No. 1 Lake Park'
    },
    {
      name: 'Joe Black',
      city: 'London',
      address: 'Sidney No. 1 Lake Park'
    },
    {
      name: 'Jim Red',
      city: 'London',
      address: 'London No. 2 Lake Park'
    }
  ];
  listOfDisplayData = [...this.listOfData];

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: DataItem) => item.name.indexOf(this.searchValue) !== -1);
  }

  onBack(): void {
    console.log('onBack');
  }

}
