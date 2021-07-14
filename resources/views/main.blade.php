<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{$title}}</title>
    <link rel="stylesheet" href="{{ asset('css/navbar.css') }}">
    <link rel="stylesheet" href="{{ asset('css/common.css') }}">    
    @foreach ($styleSheets as $style)
        @if ($style['local'])            
            <link rel="stylesheet" href="{{ asset($style['route']) }}">    
        @else
            <link rel="stylesheet" href="{{ $style['route'] }}">        
        @endif 
    @endforeach
</head>
<body>    
    @include('menu.menu')
    
    @yield('content')

    @foreach ($jsDocs as $js)        
        @if ($js['local'])
            <script src="{{ asset($js['route']) }}"></script>
        @else
            <script src="{{ $js['route'] }}"></script>
        @endif                
    @endforeach
</body>

</html>

