import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface Widget{
  id: string
  title: string
  type: 'weather' | 'time' | 'notes'
  data: any
  icon: string
}

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
})
export class WidgetComponent implements OnInit {
  loc: any = {};
  currentDate: Date = new Date();
  formattedDate = this.currentDate.toLocaleDateString();
  formattedTime = this.currentDate.toLocaleTimeString();

  // ИСПРАВЛЕНО: было "wigets", стало "widgets"
  widgets: Widget[] = [
    { 
      id: 'weather', 
      title: 'Погода в Москве', 
      type: 'weather', 
      data: { temperature: null, description: null },
      icon: 'partly-sunny'
    },
    { 
      id: 'time', 
      title: 'Текущее время', 
      type: 'time', 
      data: { time: this.formattedTime, date: this.formattedDate },
      icon: 'time'
    },
    { 
      id: 'notes', 
      title: 'Заметки', 
      type: 'notes', 
      data: { content: '', saved: false },
      icon: 'document'
    },
  ];

  constructor() { }

  ngOnInit() {
    this.getWeatherData();
    this.startTimeUpdate();
    
    // Временная заглушка для локализации
    this.loc = {
      COMPONENT_TITLE: 'Виджеты',
      LOADING: 'Загрузка',
      NOTES_PLACEHOLDER: 'Введите ваши заметки здесь...',
      SAVE: 'Сохранить',
      SAVED: 'Сохранено'
    };
  }

  getWeatherData() {
    // Временные данные для примера
    setTimeout(() => {
      this.widgets[0].data = {
        temperature: '+5°C',
        description: 'Облачно'
      };
    }, 1000);
  }

  startTimeUpdate() {
    setInterval(() => {
      this.currentDate = new Date();
      this.widgets[1].data = {
        time: this.currentDate.toLocaleTimeString(),
        date: this.currentDate.toLocaleDateString()
      };
    }, 1000);
  }

  saveNote(content: string) {
    this.widgets[2].data = {
      content: content,
      saved: true
    };
    // Здесь можно добавить сохранение в localStorage
    localStorage.setItem('widget-notes', content);
  }
}