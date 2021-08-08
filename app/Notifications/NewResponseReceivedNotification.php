<?php

namespace App\Notifications;

use App\Models\quiz;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewResponseReceivedNotification extends Notification implements ShouldBroadcast
{
    use Queueable;
    public $quiz;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($quiz)
    {
        $this->quiz = $quiz;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['broadcast', 'database'];
    }

    public function toBroadcast($notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            'message' => "Recibiste una nueva respuesta en tu quiz {$this->quiz}"
        ]);
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
            'message' => "Recibiste una nueva respuesta en tu quiz {$this->quiz}"
        ];
    }
}
