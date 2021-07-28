<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    @include('menu.menu')

    @yield('content')
    <script>
        let ASSETS_ROUTE = '{{ URL::asset('
        ')}}'
    </script>
    @foreach ($jsDocs as $js)
    @if ($js['local'])
    <script src="{{ asset($js['route']) }}"></script>
    @else
    <script src="{{ $js['route'] }}"></script>
    @endif
    @endforeach
</body>

</html>

</html>