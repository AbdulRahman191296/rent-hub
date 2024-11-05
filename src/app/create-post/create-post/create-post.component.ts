import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../authentication/user.service';
import { Router } from '@angular/router';
import { User } from '../../authentication/user';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { PreviewOverlayComponent } from '../../preview-overlay/preview-overlay.component';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {
  postForm: FormGroup;
  selectedFiles: File[] = [];
  previewUrls: string[] = [];
  maxId: number;
  postObj: any;

  amenitiesList= [
    'WiFi',
    'Swimming Pool',
    'Gym',
    'Parking',
    'Elevator',
    'Power Backup',
    'Laundry',
    'Club House',
    'Private Lawn',
    'Water Heater',
    'Park',
    'Food Service',
  ];

  flooringTypes = [
    'Marble',
    'Granite',
    'Vitrified Tiles',
    'Hardwood',
    'Vinyl'
  ]

  
  createPostObject() {

    const selectedAmenities = this.postForm.get('amenities') as FormArray;
    const selectedAmenitiesList = selectedAmenities.controls
      .map((control, index) => (control.value ? this.amenitiesList[index] : null))
      .filter(amenity => amenity !== null);
    console.log("selected amenities", selectedAmenitiesList)
      let postObj = {
      id: this.maxId +1,
      propertyType: this.postForm.get('propertyType')?.value,
      propertyName: this.postForm.get('propertyName')?.value,
      sharedProperty: this.postForm.get('sharedProperty')?.value,
      location: this.postForm.get('location')?.value,
      area: this.postForm.get('area')?.value,
      type: this.postForm.get('type')?.value,
      rent: this.postForm.get('rent')?.value,
      bedrooms: this.postForm.get('bedrooms')?.value,
      bathrooms: this.postForm.get('bathrooms')?.value,
      flooringType: this.postForm.get('floorType')?.value,
      mode: this.postForm.get('mode')?.value,
      furnished: this.postForm.get('furnished')?.value,
      featured: this.postForm.get('featured')?.value,
      phone: this.postForm.get('phone')?.value,
      title: this.postForm.get('title')?.value,
      desc: this.postForm.get('desc')?.value,
      images: this.previewUrls,
      amenities: selectedAmenitiesList,
      createdBy: (JSON.parse(localStorage.getItem('currentUser')) as User).emailId,
      postedDate: Date.now(),
      comments: [],
      interests: []
    };
    this.postObj = postObj;
    
  }
  

  constructor(private overlay: Overlay , private formBuilder: FormBuilder, private userService: UserService, private router: Router){
    this.postForm = this.formBuilder.group({
      propertyType: ['', Validators.required],
      propertyName: ['', Validators.required],
      sharedProperty: ['', Validators.required],
      location: ['', Validators.required],
      area: ['', Validators.required],
      type: ['', Validators.required],
      rent: ['', Validators.required],
      bedrooms: ['', Validators.required],
      bathrooms: ['', Validators.required],
      mode: ['', Validators.required],
      furnished: ['', Validators.required],
      floorType: ['', Validators.required],
      title: ['', Validators.required],
      desc: ['', Validators.required],
      phone: ['', Validators.required],
      featured: ['', Validators.required],
      amenities: this.formBuilder.array([])
    }); 
  }

  ngOnInit() {

    this.userService.getAllPosts().subscribe(x=> {
      let allPosts = x.payload.data().allPosts;
      
      this.maxId = allPosts.reduce((max, item) => (item.id > max ? item.id : max), allPosts[0]?.id || 0);
      console.log("MAX ID", this.maxId)
    });

    const amenitiesArray = this.postForm.get('amenities') as FormArray;

    this.amenitiesList.forEach(x => {
      amenitiesArray.push(this.formBuilder.control(false)); // Add each amenity as a FormControl
    });

    console.log("ERROR FORM", this.postForm);
  }

  private overlayRef: OverlayRef;

  onFileChange(event: any) {
    console.log("file change event", event);
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFiles = Array.from(input.files);
      this.previewUrls = [];
      this.selectedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          this.previewUrls.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    }
    console.log("preview urls", this.previewUrls);
  }

  upload(): void {
    if (this.selectedFiles) {
      console.log("selected file", this.selectedFiles);
      
      // Replace 'your-backend-url' with your actual endpoint
      
    }

  }
  onSubmit() {
    this.createPostObject();
    
    this.userService.registerPostsInDocument(this.postObj);
    this.router.navigate(['/home']);
    
  }

  onPreviewClick() {
    this.open();
  }

  open() {
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create(
        {
          panelClass: 'custom-overlay-panel',
        }
      );
      const componentPortal = new ComponentPortal(PreviewOverlayComponent);
       const overlayComponentRef = this.overlayRef.attach(componentPortal);
       this.createPostObject();
       overlayComponentRef.instance.post = this.postObj;

      overlayComponentRef.instance.close.subscribe((message: string) => {
        if(message === "submit") {
          this.userService.registerPostsInDocument(this.postObj);
          this.router.navigate(['/home']);
        }
        this.close();
        console.log(message); // Handle the emitted message from overlay
      });
    }
  }

  close() {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef = null;
    }
  }

  

}
