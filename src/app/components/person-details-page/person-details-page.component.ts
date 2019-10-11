import { Component, Input, OnInit } from '@angular/core';
import { PupilType, UserType } from '@app/types/common.types';
import { HelperService } from '@services/helper/helper.service';
import { UnitItemType } from '@app/types/common.enums';

@Component({
  selector: 'mts-person-details-page',
  templateUrl: './person-details-page.component.html',
  styleUrls: ['./person-details-page.component.scss']
})
export class PersonDetailsPageComponent implements OnInit {
  @Input() person: UserType | PupilType;
  @Input() editUrl: string;
  unitItemType = UnitItemType;

  constructor(private helper: HelperService) { }

  ngOnInit() {
  }

  getAvatarUrl() {
    // if (this.teacherForm.get('avatarPreview').value) {
    //   return this.teacherForm.get('avatarPreview').value;
    // }

    return '/assets/images/user-placeholder.png';
  }

  getAgeStr(dob: string): string {
    return this.helper.getAgeStr(dob);
  }

}
