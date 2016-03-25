sealed class test013_FuseDrawingSolidColor_float4_Color_Property: Uno.UX.Property<float4>
{
    Fuse.Drawing.SolidColor _obj;
    public test013_FuseDrawingSolidColor_float4_Color_Property(Fuse.Drawing.SolidColor obj) { _obj = obj;  }
    protected override float4 OnGet() { return _obj.Color; }
    protected override void OnSet(float4 v, object origin) { _obj.Color = v; }
}
sealed class test013_FuseTriggersWhileBool_bool_Value_Property: Uno.UX.Property<bool>
{
    Fuse.Triggers.WhileBool _obj;
    public test013_FuseTriggersWhileBool_bool_Value_Property(Fuse.Triggers.WhileBool obj) { _obj = obj;  }
    protected override bool OnGet() { return _obj.Value; }
    protected override void OnSet(bool v, object origin) { _obj.Value = v; }
}
sealed class test013_FuseiOSStatusBarConfig_UnoPlatformiOSStatusBarStyle_Style_Property: Uno.UX.Property<Uno.Platform.iOS.StatusBarStyle>
{
    Fuse.iOS.StatusBarConfig _obj;
    public test013_FuseiOSStatusBarConfig_UnoPlatformiOSStatusBarStyle_Style_Property(Fuse.iOS.StatusBarConfig obj) { _obj = obj;  }
    protected override Uno.Platform.iOS.StatusBarStyle OnGet() { return _obj.Style; }
    protected override void OnSet(Uno.Platform.iOS.StatusBarStyle v, object origin) { _obj.Style = v; }
}
sealed class test013_FuseEffectsBlur_float_Radius_Property: Uno.UX.Property<float>
{
    Fuse.Effects.Blur _obj;
    public test013_FuseEffectsBlur_float_Radius_Property(Fuse.Effects.Blur obj) { _obj = obj;  }
    protected override float OnGet() { return _obj.Radius; }
    protected override void OnSet(float v, object origin) { _obj.Radius = v; }
}
