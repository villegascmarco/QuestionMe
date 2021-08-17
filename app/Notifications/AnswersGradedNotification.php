<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AnswersGradedNotification extends Notification implements ShouldBroadcast
{
    use Queueable;
    public $quiz;
    public $non_human;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($quiz, $non_human)
    {
        $this->quiz = $quiz;
        $this->non_human = $non_human;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Han revisado tus respuestas')
            ->from('sender@example.com', 'Sender')
            ->greeting('¡Hola!')
            ->line('Tus respuestas para el quiz ' . $this->quiz . ' han sido evaluadas.')
            ->action('Ve tus respuestas aquí', url('nonHuman/' . $this->non_human))
            ->line('Saludos.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
