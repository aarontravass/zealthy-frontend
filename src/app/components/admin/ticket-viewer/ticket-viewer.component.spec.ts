import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TicketViewerComponent } from './ticket-viewer.component'

describe('TicketViewerComponent', () => {
  let component: TicketViewerComponent
  let fixture: ComponentFixture<TicketViewerComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TicketViewerComponent]
    })
    fixture = TestBed.createComponent(TicketViewerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
